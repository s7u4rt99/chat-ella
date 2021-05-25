import { Button } from "@material-ui/core";
// import firebase from "firebase/app";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import "./style.css"
function PageLogin() {
    const handleGoogleSignIn = (firebase) => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
    };

    return (
        <>
            <div className="background-wrapper" id="main"/>
            <div className="select-profile-pic-wrapper" id="select-profile-pic-menu"/>
            <div className="get-started" id="login-screen">
                <p>
                    Chat <span className="login-p-subtitle">ella</span>
                </p>
                <input type="text" name="email" id="email" placeholder="Email" className="login-form"/>
                <input type="password" name="password" id="password" className="login-form" placeholder="Password"/>
                <input type="button" value="Login" className="login-btn" onClick="login()"/>
                <FirebaseAuthConsumer>
                    {({ firebase }) => (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleGoogleSignIn(firebase)}
                        >
                            Sign in with Google
                        </Button>
                    )}
                </FirebaseAuthConsumer>
            </div>

        </>
    );
}

export default PageLogin;
