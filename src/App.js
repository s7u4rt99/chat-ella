import {
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";
import PageLogin from "./pages/LoginPage";
import PageChat from "./pages/ChatPage";
//import AppShell from "./components/Header/AppShell"



export default function App() {
    return (

            <div className="App">
                <FirebaseAuthConsumer>
                    <IfFirebaseAuthed>
                        {/*<AppShell />*/}
                        {/*<div style={{ width: "100%", margin: "0 auto" }} />*/}
                        {/*<PageChat loginMe={loginMe} submitFunction={submitFunction} notifyTyping={notifyTyping}/>*/}
                        <PageChat />
                    </IfFirebaseAuthed>
                    <IfFirebaseUnAuthed>
                        <PageLogin />
                    </IfFirebaseUnAuthed>
                </FirebaseAuthConsumer>
            </div>
    );
}



