import {
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from "@react-firebase/auth";
import PageLogin from "./pages/LoginPage";
import PageChat from "./pages/ChatPage";
import socketClient from "socket.io-client";
import {useEffect, useState} from "react";
const SERVER = "http://127.0.0.1:3000"


// import "./pages/style.css";


export default function App() {
    // var socket = socketClient (SERVER);
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketClient(SERVER);
        socket.on("onlineUsers", data => {
            setResponse(data);
        });
    }, []);

    return (
        <>
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
            <p>Hello {response}</p>
        </>
    );
}
