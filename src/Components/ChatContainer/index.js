import "./index.css"
import { Component, React } from "react"
import Header from "../Header"
import ChatItem from "../ChatItem"
import { BsEmojiSmile } from "react-icons/bs"
import { v4 as uuidv4 } from 'uuid'
import EmojiPicker from 'emoji-picker-react';
const chatList = []


const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]

const user_logo_colors = ["red", "yellow", "orange", "pink", "blue"]

let mentionsList = [...user_list]

class ChatContainer extends Component {
    state = { chatList, messageInput: "", showEmojiPicker: false, showMentions: false, includesList: mentionsList }
    updateMsgValue = (event) => {
        this.setState({ messageInput: event.target.value }, () => {
        });
    }
    toggleEmojiPicker = () => {
        this.setState((prevState) => ({ showEmojiPicker: !prevState.showEmojiPicker }))
    };

    handleEmojiClick = (emoji) => {
        const { messageInput } = this.state;
        const emojiValue = emoji.emoji;
        this.setState({
            messageInput: messageInput + emojiValue,
        });
    };

    UpdateMentions = () => {
        this.setState(prevState => ({ showMentions: !prevState.showMentions }))
    }

    UpdateMentions2 = () => {
        this.setState({ showMentions: true })
    }

    checkMentions = () => {
        const { messageInput, includesList } = this.state
        const parts = messageInput.split("@");
        console.log("a", parts)
        console.log(parts.length)
        console.log(parts[parts.length - 1])
        if (parts.length === 1) {
            parts[1] = ""
        }
        console.log(parts)
        console.log("part", parts[-1])
        const FilteredList = includesList.filter(
            user => user.toLowerCase().startsWith(parts[parts.length - 1].toLowerCase())
        )
        console.log(FilteredList)
        if (FilteredList.length === 0) {

            this.UpdateMentions()
            this.setState({ includesList: mentionsList })
        }
        else {
            this.setState({ includesList: FilteredList })
        }

    }
    postMsg = (event) => {
        const { showMentions } = this.state
        if (showMentions)
            this.checkMentions()
        if (event.key === "@") {
            const updatedMessage = document.getElementById("MessageInput").value
            console.log("updatedMessage", updatedMessage)
            this.updateMsgValue({ target: { value: updatedMessage } });
            this.UpdateMentions2()
            this.checkMentions()
        }

        else if (event.key === "Enter") {
            const { messageInput, chatList } = this.state
            const randomNumber = Math.floor(Math.random() * 5);
            const userName = user_list[randomNumber]
            const logoLetter = userName[0]
            const logoColor = user_logo_colors[randomNumber]
            const msg = messageInput
            const MsgSentTime = new Date();

            const id = uuidv4()
            const Message = {
                userName, logoLetter, msg, id, logoColor, MsgSentTime
            }
            this.setState({
                chatList: [...chatList, Message],
                messageInput: ""
            })
        }
    }

    FillInputbox = (includedUser) => {
        const { includesList, messageInput } = this.state
        const UserToBeIncluded = includesList.find(user => user === includedUser)
        let arr = messageInput.split("@");
        arr[arr.length - 1] = ""
        let messageInputNew = arr.join("@")
        this.setState(prevState => ({
            messageInput: messageInputNew + UserToBeIncluded,
            showMentions: !prevState.showMentions,
            includesList: mentionsList
        })

        )
    }

    render() {
        const { showMentions, messageInput, chatList, showEmojiPicker, includesList } = this.state
        console.log(includesList)
        return (
            <div className="bg-container">
                <Header className="header" />
                <ul className="Chat-items">
                    {chatList.map(chat => <ChatItem key={chat.id} MessageDetails={chat} />)}
                    {showEmojiPicker && (
                        <div className="emoji-picker-container">
                            <EmojiPicker onEmojiClick={this.handleEmojiClick} />
                        </div>
                    )}


                </ul>
                {showMentions && (
                    <ul className="mentions-list">
                        {includesList.map(
                            user => <li className="mention-item"
                                key={user} onClick={() => this.FillInputbox(user)}>
                                <p className="suggestion">{user}</p>
                                <hr className="ruler" />
                            </li>
                        )}
                    </ul>
                )}
                
                <div className="msg-input-cotainer">

                    <input
                        className="message-input"
                        value={messageInput}
                        placeholder="Type Message"
                        onChange={this.updateMsgValue}
                        onKeyUp={this.postMsg}
                        id="MessageInput"
                    />
                    <button className="emoji-icon" type="button" onClick={this.toggleEmojiPicker}>
                        <BsEmojiSmile />
                    </button>

                </div>
            </div>
        )
    }
}
export default ChatContainer
