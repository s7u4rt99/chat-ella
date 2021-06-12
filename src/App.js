import {
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";
import PageLogin from "./pages/LoginPage";
import PageChat from "./pages/ChatPage";
import AppShell from "./components/Header/AppShell"



export default function App() {
    return (

            <div className="App">
                <AppShell />
                <div style={{ width: "100%", margin: "0 auto" }}>
                <FirebaseAuthConsumer>
                    <IfFirebaseAuthed>
                        {/*<PageChat loginMe={loginMe} submitFunction={submitFunction} notifyTyping={notifyTyping}/>*/}
                        <PageChat />
                    </IfFirebaseAuthed>
                    <IfFirebaseUnAuthed>
                        <PageLogin />
                    </IfFirebaseUnAuthed>
                </FirebaseAuthConsumer>
            </div>
        </div>
    );
}



