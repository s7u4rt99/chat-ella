// import {
//     FirebaseAuthConsumer,
//     IfFirebaseAuthed,
//     IfFirebaseUnAuthed
// } from "@react-firebase/auth";
// import Firebase from '@firebase/app'
import "@firebase/auth";
import PageLogin from "./pages/LoginPage";
import PageChat from "./pages/ChatPage";
import { useState } from "react";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import OnlineUsers from "./components/OnlineUsers/OnlineUsers";
// import "./App.css"
//import AppShell from "./components/Header/AppShell"

export default function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = (firebase) => {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((user) => {
        console.log(user.user.emailVerified);
        if (!user.user.emailVerified) {
          alert("Please verify your email to proceed");
          firebase.auth().signOut();
        }
        clearInputs();
        clearErrors();
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = (firebase) => {
      if (!username) {
          alert("Please fill in a username to sign up")
      } else {
          firebase
              .auth()
              .createUserWithEmailAndPassword(email.trim(), password)
              .then((userCredential) => {
                  // send verification mail.
                  userCredential.user.updateProfile({displayName: username});
                  userCredential.user.sendEmailVerification();
                  firebase.auth().signOut();
                  alert("Email sent");
                  clearInputs();
                  clearErrors();
              })
              .catch((err) => {
                  switch (err.code) {
                      case "auth/email-already-in-use":
                      case "auth/invalid-email":
                          setEmailError(err.message);
                          break;
                      case "auth/weak-password":
                          setPasswordError(err.message);
                          break;
                  }
              });
      }
  };

  const handleForgetPassword = (firebase) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email.trim())
      .then((userCredential) => {
        // send verification mail.
        firebase.auth().signOut();
        alert("An email has been sent to your email to change your password");
        setForgotPassword(false);
        clearErrors();
        clearInputs();
        window.location.reload();
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  // const handleSignup = (firebase) => {
  //   clearErrors();
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(function (result) {
  //       result.user
  //         .updateProfile({ displayName: username })
  //         .then((r) => window.location.reload());
  //     })
  //     .catch((err) => {
  //       switch (err.code) {
  //         case "auth/email-already-in-use":
  //         case "auth/invalid-email":
  //           setEmailError(err.message);
  //           break;
  //         case "auth/weak-password":
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     });
  // };
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
            forgotPassword={forgotPassword}
            setForgotPassword={setForgotPassword}
            setEmailError={setEmailError}
            setPasswordError={setPasswordError}
            handleForgetPassword={handleForgetPassword}
            clearErrors={clearErrors}
            clearInputs={clearInputs}
          />
        </IfFirebaseUnAuthed>
        {/*<IfFirebaseAuthed>*/}
        <IfFirebaseAuthedAnd
          filter={({ user }) => {
            return user.displayName !== null && user.emailVerified;
          }}
        >
          {/*<PageChat user={user}/>*/}
          {/*<FirebaseAuthConsumer>*/}
          <PageChat />
          {/*    <PageChat onLoad={()=>window.location.reload()}/>*/}
          {/*{({user, isSignedIn}) => user.displayName != null ? (<PageChat/>) : (<div></div>)}*/}
          {/*</FirebaseAuthConsumer>*/}
        </IfFirebaseAuthedAnd>
        {/*</IfFirebaseAuthed>*/}
      </FirebaseAuthConsumer>
    </div>
  );
  // return (FirebaseAuthed>*/}
  //             </FirebaseA
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
