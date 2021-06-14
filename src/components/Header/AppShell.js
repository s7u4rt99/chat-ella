import {useState} from "react";
import {AppBar, Avatar, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {IfFirebaseAuthed} from "@react-firebase/auth";
import io from "socket.io-client";




function AppShell(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const myUserId = props.userId;
    const socket = io("http://localhost:4000");
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = (firebase, socket) => {
        handleClose();
        firebase.auth().signOut();
        socket.emit('userIsDisconnected', myUserId );
    };

    return (
        <AppBar position="relative">
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
                            >
                                <MenuItem onClick={() => handleLogout(firebase, socket)}>
                                    Logout
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