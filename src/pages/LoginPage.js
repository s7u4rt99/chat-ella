import { Button } from "@material-ui/core";
import firebase from "@firebase/app";
import "@firebase/auth";
import fire from "../config/firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
// import "./style.css"
import "../App.css";
function PageLogin(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    username,
    setUsername,
    forgotPassword,
    setForgotPassword,
    setEmailError,
    setPasswordError,
    handleForgetPassword,
    clearErrors,
    clearInputs,
  } = props;

  const handleGoogleSignIn = (firebase) => {
    let googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    // fi.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(function (result) {
        // // This gives you a Google Access Token.
        //     var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     var user = result.user;
        console.log(result.user.emailVerified);
        console.log(result);
      });
  };

  return (
    <section className="login">
      {/*<input type="button" value="Login" className="login-btn" onClick="login()"/>*/}
      {forgotPassword ? (
        <div className="loginContainer" id="login-screen">
          <p className="title">Chatella</p>
          <label>Email</label>
          <input
            type="text"
            autoFocus
            required
            name="email"
            id="email"
            placeholder="Email"
            className="login-form"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
          {/* <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="login-form"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="errorMsg">{passwordError}</p> */}
          {/*<label>Username</label>*/}
          {/*<input type="username" name="username" id="username" className="login-form" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>*/}
          <div className="btnContainer">
            <FirebaseAuthConsumer>
              {({ firebase }) => (
                <button onClick={() => handleForgetPassword(firebase)}>
                  Reset Password
                </button>
              )}
            </FirebaseAuthConsumer>
            {/* <input
                type="button"
                value="Login"
                className="login-btn"
                onClick={handleLogin}
              /> */}
            <p>
              Remember your login details?{" "}
              <span
                onClick={() => {
                  setForgotPassword(false);
                  clearErrors();
                  // clearInputs();
                }}
              >
                Back
              </span>
            </p>
          </div>
        </div>
      ) : hasAccount ? (
        <div className="loginContainer" id="login-screen">
          <p className="title">Chatella</p>
          <label>Email</label>
          <input
            type="text"
            autoFocus
            required
            name="email"
            id="email"
            placeholder="Email"
            className="login-form"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="login-form"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errorMsg">{passwordError}</p>
          {/*<label>Username</label>*/}
          {/*<input type="username" name="username" id="username" className="login-form" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>*/}
          <div className="btnContainer">
            <FirebaseAuthConsumer>
              {({ firebase }) => (
                <button onClick={() => handleLogin(firebase)}>Sign in</button>
              )}
            </FirebaseAuthConsumer>
            {/*<input type="button" value="Login" className="login-btn" onClick={handleLogin}/>*/}
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setHasAccount(!hasAccount);
                  clearErrors();
                  // clearInputs();
                }}
              >
                Sign up
              </span>
            </p>
            <p1
              onClick={() => {
                setForgotPassword(true);
                clearErrors();
                // clearInputs();
              }}
            >
              Forgot password?
            </p1>
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
        </div>
      ) : (
        <div className="loginContainer" id="login-screen">
          <p className="title">Chatella</p>
          <label>Email</label>
          <input
            type="text"
            autoFocus
            required
            name="email"
            id="email"
            placeholder="Email"
            className="login-form"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="login-form"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errorMsg">{passwordError}</p>
          <label>Username</label>
          <input
            type="username"
            name="username"
            id="username"
            className="login-form"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="btnContainer">
            <FirebaseAuthConsumer>
              {({ firebase }) => (
                <button onClick={() => handleSignup(firebase)}>Sign up</button>
              )}
            </FirebaseAuthConsumer>
            {/*<input type="button" value="Sign Up" className="login-btn" onClick={handleSignup}/>*/}
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setHasAccount(!hasAccount);
                  clearErrors();
                  // clearInputs();
                }}
              >
                Sign in
              </span>
            </p>
            <p1
              onClick={() => {
                setForgotPassword(true);
                clearErrors();
                // clearInputs();
              }}
            >
              Forgot password?
            </p1>
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
        </div>
      )}
    </section>
  );
  // return (
  //     <section className='login'>
  //         <div className="loginContainer" id="login-screen">
  //             <p className='title'>Chatella</p>
  //             <label>Email</label>
  //             <input type="text" autoFocus required name="email" id="email" placeholder="Email" className="login-form" onChange={(e) => setEmail(e.target.value)}/>
  //             <p className="errorMsg">{emailError}</p>
  //             <label>Password</label>
  //             <input type="password" name="password" id="password" className="login-form" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
  //             <p className="errorMsg">{passwordError}</p>
  //             {/*<input type="button" value="Login" className="login-btn" onClick="login()"/>*/}
  //             <div className="btnContainer">
  //                 {hasAccount ? (
  //                     <>
  //                         <button onClick={handleLogin}>Sign in</button>
  //                         {/*<input type="button" value="Login" className="login-btn" onClick={handleLogin}/>*/}
  //                         <p>Don't have an account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign up</span></p>
  //                     </>
  //                 ) : (
  //                     <>
  //                         <button onClick={handleSignup}>Sign up</button>
  //                         {/*<input type="button" value="Sign Up" className="login-btn" onClick={handleSignup}/>*/}
  //                         <p>Already have an account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></p>
  //                     </>
  //                 )}
  //             </div>
  //             <Button
  //                 variant="contained"
  //                 color="primary"
  //                 onClick={() => handleGoogleSignIn()}
  //             >
  //                 Sign in with Google
  //             </Button>
  //         </div>
  //     </section>
  // );
  // return (
  //     <>
  //         <div className="background-wrapper" id="main"/>
  //         <div className="select-profile-pic-wrapper" id="select-profile-pic-menu"/>
  //         <div className="get-started" id="login-screen">
  //             <p>
  //                 Chat <span className="login-p-subtitle">ella</span>
  //             </p>
  //             <input type="text" name="email" id="email" placeholder="Email" className="login-form" onChange={(e) => setEmail(e.target.value)}/>
  //             <p className="errorMsg">{emailError}</p>
  //             <input type="password" name="password" id="password" className="login-form" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
  //             <p className="errorMsg">{passwordError}</p>
  //             {/*<input type="button" value="Login" className="login-btn" onClick="login()"/>*/}
  //             <div className="btnContainer">
  //                 {hasAccount ? (
  //                     <>
  //                         <input type="button" value="Login" className="login-btn" onClick={handleLogin}/>
  //                         <p>Don't have an account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign up</span></p>
  //                     </>
  //                 ) : (
  //                     <>
  //                         <input type="button" value="Sign Up" className="login-btn" onClick={handleSignup}/>
  //                         <p>Already have an account? <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></p>
  //                     </>
  //                 )}
  //             </div>
  //             <FirebaseAuthConsumer>
  //                 {({ firebase }) => (
  //                     <Button
  //                         variant="contained"
  //                         color="primary"
  //                         onClick={() => handleGoogleSignIn(firebase)}
  //                     >
  //                         Sign in with Google
  //                     </Button>
  //                 )}
  //             </FirebaseAuthConsumer>
  //         </div>
  //
  //     </>
  // );
}

export default PageLogin;
