import "./index.css"
import {BsPeople} from "react-icons/bs"

const Header =()=>{

    return(
        <div className="bg">
        <div className="info">
        <div>
            <h3 className="heading">Introductions</h3>
            <p>This Channel is For Company Wide Chatter</p>
        </div>
        <div className="online-info">
            <p className="online">3 | 100</p>
            <BsPeople/>
        </div>
        
        </div>
        <hr className="ruler"/></div>
    )
}
export default Header