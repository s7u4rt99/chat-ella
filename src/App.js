// import {
//     FirebaseAuthConsumer,
//     IfFirebaseAuthed,
//     IfFirebaseUnAuthed
// } from "@react-firebase/auth";
// import Firebase from '@firebase/app'
import '@firebase/auth'
import PageLogin from "./pages/LoginPage";
import PageChat from "./pages/ChatPage";
import {useEffect, useState} from "react";
import fire from "./config/firebase";
import {FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd, IfFirebaseUnAuthed} from "@react-firebase/auth";
// import "./App.css"
//import AppShell from "./components/Header/AppShell"



export default function App() {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState('')
    const [hasAccount, setHasAccount] = useState(false)
    const [username, setUsername] = useState('')

    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }

    const clearErrors = () => {
        setEmailError('')
        setPasswordError('')
    }

    const handleLogin = (firebase) => {
        clearErrors()
        firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            switch(err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
            }
        })
    }

    const handleSignup = (firebase) => {
        clearErrors()
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
            return result.user.updateProfile({displayName: username})
        } ).catch(err => {
            switch(err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        })
    }
    //
    // const authListener = () => {
    //     fire.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             clearInputs()
    //             setUser(user);
    //         } else {
    //             setUser('');
    //         }
    //     })
    // }
    //
    // useEffect(() => {
    //     authListener();
    // }, [])

    return (
        <div className="App">
            <FirebaseAuthConsumer>
                <IfFirebaseUnAuthed>
                    <PageLogin
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignup={handleSignup}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}
                    username={username}
                    setUsername={setUsername}
                    />
                </IfFirebaseUnAuthed>
                <IfFirebaseAuthedAnd filter={({user}) => {
                    return user.displayName !== null
                }}>
                    {/*<PageChat user={user}/>*/}
                    <PageChat />
                </IfFirebaseAuthedAnd>
            </FirebaseAuthConsumer>
        </div>
    );
    // return (
    //         <div className="App">
    //             {!user ? (
    //                 <PageLogin
    //                     email={email}
    //                     setEmail={setEmail}
    //                     password={password}
    //                     setPassword={setPassword}
    //                     handleLogin={handleLogin}
    //                     handleSignup={handleSignup}
    //                     hasAccount={hasAccount}
    //                     setHasAccount={setHasAccount}
    //                     emailError={emailError}
    //                     passwordError={passwordError}
    //                 />
    //              ) : (
    //             <PageChat user={user}/>
    //             )}
    //         </div>
    // );
}



