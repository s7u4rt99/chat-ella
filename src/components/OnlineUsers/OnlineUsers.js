import "../style.css";

function OnlineUsers(props) {
    const { username, selectUserChatBox } = props;
    return (
        <>
            <div className="userInfo">Welcome {" "}
                <label id="myName">{username}</label> !!
            </div>
            <div>
                <ul id="onlineUsers"/>
            </div>
        </>
    );
}

export default OnlineUsers;
