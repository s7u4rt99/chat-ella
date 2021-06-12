import {useState} from "react";
import {AppBar, Avatar, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {IfFirebaseAuthed} from "@react-firebase/auth";


function AppShell() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = (firebase) => {
        handleClose();
        firebase.auth().signOut();
    };

    return (
        <AppBar position="static">
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
                                <MenuItem onClick={() => handleLogout(firebase)}>
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