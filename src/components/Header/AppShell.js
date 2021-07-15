// import {useState} from "react";
// import {AppBar, Avatar, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
// // import {IfFirebaseAuthed} from "@react-firebase/auth";
// import fire from "../../config/firebase"
//
// function AppShell(props) {
//     const {user} = props;
//
//     const [anchorEl, setAnchorEl] = useState(null);
//
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//
//     const handleLogout = () => {
//         handleClose();
//         fire.auth().signOut();
//     };
//
//     return (
//         <AppBar position="relative">
//             <Toolbar>
//                 <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
//                     Chatella
//                 </Typography>
//                 <div>
//                     <Avatar
//                         alt={user.displayName}
//                         src={user.photoURL}
//                         aria-controls="simple-menu"
//                         aria-haspopup="true"
//                         onClick={handleClick}
//                     />
//                     <Menu
//                         id="simple-menu"
//                         anchorEl={anchorEl}
//                         keepMounted
//                         open={Boolean(anchorEl)}
//                         onClose={handleClose}
//                     >
//                         <MenuItem onClick={(e) => handleLogout(e)}>
//                             Logout
//                         </MenuItem>
//                     </Menu>
//                 </div>
//             </Toolbar>
//         </AppBar>
//     );
// }
import { IfFirebaseAuthed } from "@react-firebase/auth";
import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

function AppShell(props) {
  const {hide, isHidden} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const showText = 'Show OnlineUsers';
  const hideText = 'Hide OnlineUsers';
  const [text, setText] = useState(hideText);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hideAndChangeText = () => {
    hide();
    if (text === hideText){
      setText(showText);
    } else {
      setText(hideText);
    }
  }

  const handleLogout = (firebase) => {
    handleClose();
    firebase.auth().signOut();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
          Chatella
        </Typography>
        <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <div>
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem onClick={() => handleLogout(firebase)}>
                  Logout
                </MenuItem>
                  <MenuItem onClick={() => hideAndChangeText()}>
                    {text}
                  </MenuItem>
              </Menu>
            </div>
          )}
        </IfFirebaseAuthed>
      </Toolbar>
    </AppBar>
  );
}

export default AppShell;
