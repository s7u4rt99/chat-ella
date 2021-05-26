import OnlineUsers from "../components/OnlineUsers/OnlineUsers";
import ChatContainer from "../components/Chat/Chat"
import "../components/style.css"
import { FirebaseAuthConsumer } from "@react-firebase/auth";
//
// componentDidMount() {
//     this.loadChannels();
// }
//
// loadChannels = async () => {    fetch('http://localhost:3000/getChannels').then(async response => {
//     let data = await response.json();
//     this.setState({ channels: data.channels });
// })
// ‍}
function ChatPage() {
    return (
        <>
            <div className="onlineUsersContainer">
                <FirebaseAuthConsumer>
                    {({ user }) => <OnlineUsers user={user.displayName}/>}
                </FirebaseAuthConsumer>
            </div>
            <div className="chatContainer">
                <ChatContainer />
            </div>
        </>
    );
}

export default ChatPage;
