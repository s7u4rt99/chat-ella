import {
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";
import PageLogin from "./pages/LoginPage";
import PageChat from "./pages/ChatPage";

// import "./pages/style.css";

export default function App() {
    return (
        <div className="App">
            <FirebaseAuthConsumer>
                <IfFirebaseAuthed>
                    <PageChat/>
                </IfFirebaseAuthed>
                <IfFirebaseUnAuthed>
                    <PageLogin st/>
                </IfFirebaseUnAuthed>
            </FirebaseAuthConsumer>
        </div>
    );
}
