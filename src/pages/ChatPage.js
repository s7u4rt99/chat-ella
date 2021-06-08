import OnlineUsers from "../components/OnlineUsers/OnlineUsers";
import ChatContainer from "../components/Chat/Chat"
import "../components/style.css"
import { FirebaseAuthConsumer } from "@react-firebase/auth";
// import {appendChatMessage, loginMe, selectUserChatBox} from "../chat";
// import openSocket from "socket.io-client";
// import React, { useEffect, useRef } from "react"
// import io from "socket.io-client"
// import {
//     clearChatNotificationCount, loadChatBox,
//     playNewMessageAudio,
//     playNewMessageNotificationAudio,
//     updateChatNotificationCount
// } from "../chat";

function ChatPage(props) {
    const {loginMe, submitFunction, notifyTyping} = props
    return (
        <>
            <div className="onlineUsersContainer">
                <FirebaseAuthConsumer>
                    {({ user }) => <OnlineUsers user={user.displayName} onload={loginMe(user.displayName)}/>}
                    {/*{({ user }) => <OnlineUsers user={user.displayName} onload={loginMe(user.displayName)}/>}*/}
                </FirebaseAuthConsumer>
            </div>
            <div className="chatContainer">
                <ChatContainer submitFunction={submitFunction} notifyTyping={notifyTyping} />
            </div>
        </>
    );
}

export default ChatPage;
