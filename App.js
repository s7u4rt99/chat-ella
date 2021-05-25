import {
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";
import PageLogin from "./src/pages/ChrisLoginPage";
import PageChat from "./src/pages/ChatPage";

import "./styles.css";

export default function App() {
    return (
        <div className="App">
            <FirebaseAuthConsumer>
                <IfFirebaseAuthed>
                    <PageChat/>
                </IfFirebaseAuthed>
                <IfFirebaseUnAuthed>
                    <PageLogin />
                </IfFirebaseUnAuthed>
            </FirebaseAuthConsumer>
        </div>
    );
}
