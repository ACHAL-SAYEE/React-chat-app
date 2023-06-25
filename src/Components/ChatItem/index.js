import "./index.css"
import React, { Component } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai"
import EmojiPicker from "emoji-picker-react";

const fixedEmojisList = ["😊", "👍", "❤️","🙏","👎","😂","😢"]

class ChatItem extends Component {
    state = {
        showEmojiPicker: false,
        currentemojivalue: "",
        showCompleteEmojis: false
    };

    toggleEmojiPicker = () => {
        console.log(this.state.showEmojiPicker)
        this.setState((prevState) => ({
            showEmojiPicker: !prevState.showEmojiPicker,
            showCompleteEmojis: !prevState.showCompleteEmojis
        }));
    };


    removeemoji = () => {
        this.setState({ currentemojivalue: "" ,showEmojiPicker:false});
    }

    handleEmojiClick = (emoji) => {
        this.setState({ currentemojivalue: emoji,showEmojiPicker:false });
    };
    handleCompleteEmojiClick = (emoji) => {
        this.setState({ currentemojivalue: emoji.emoji ,showCompleteEmojis:false});
    };

    handleLiClick = () => {
        this.setState((prevState) => ({
            showEmojiPicker: !prevState.showEmojiPicker,
        }));
    };

    hideEmojibox=()=>{
this.setState({showEmojiPicker:false,showCompleteEmojis:false})
    }

    render() {
        const { MessageDetails } = this.props;
        const { userName, logoLetter, msg, MsgSentTime, logoColor } = MessageDetails;
        const currentHour = MsgSentTime.getHours();
        const currentMinute = MsgSentTime.getMinutes();
        const { showEmojiPicker, messageInput, currentemojivalue, showCompleteEmojis } = this.state;

        return (
            <li className="chat-item-container">
                <div className="chat-item" >
                    <p className={`logo ${logoColor}`}>{logoLetter}</p>
                    <div>
                        <div className="msg-info">
                            <p className="userName">{userName}</p>
                            <p>{currentHour}:{currentMinute}</p>
                        </div>
                        <p onClick={this.handleLiClick} className="message-content">{msg}</p>
                        <p>{currentemojivalue}</p>
                    </div>

                </div>
                <div className="message-emoji">
                    {showEmojiPicker && (
                        <ul className="fixed-emojis">
                            {fixedEmojisList.map(emoji => <li className="emoji" key={emoji} onClick={() => this.handleEmojiClick(emoji)}>{emoji}</li>)}


                            <li onClick={this.removeemoji}><AiOutlineMinusCircle className="minus-icon" /></li>
                            <li onClick={this.toggleEmojiPicker}> <BsPlusCircleFill className="plus-icon" /></li>
                        </ul >
                    )}
                    {showCompleteEmojis && <div className="emojis-picker-container"><EmojiPicker onEmojiClick={this.handleCompleteEmojiClick} /></div>}
                </div >
            </li>
        );


    }
}

export default ChatItem;

