// import {submitFunction, notifyTyping } from "../../pages/server";
import "../style.css";
// import {notifyTyping, submitFunction} from "../../chat.js";

function ChatContainer(props) {
    const {submitFunction, notifyTyping} = props

    return (
        <>
            <ul id="messages"/>
            <span id="notifyTyping"/>
            <form id="form" action="" onSubmit={submitFunction}>
                <input type="hidden" id="user" value=""/>
                <input id="m" autoComplete="off" placeholder="Type your message here.." onKeyDown={notifyTyping}/>
                <input type="submit" id="button" value="Send"/>
            </form>
        </>
    );
}

export default ChatContainer;
