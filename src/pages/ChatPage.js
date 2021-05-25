import OnlineUsers from "../components/OnlineUsers/OnlineUsers";
import ChatContainer from "../components/Chat/Chat"
import "../components/style.css"

function ChatPage() {
    return (
        <>
            <div className="onlineUsersContainer">
                <OnlineUsers/>
            </div>
            <div className="chatContainer">
                <ChatContainer />
            </div>
        </>
    );
}

export default ChatPage;
