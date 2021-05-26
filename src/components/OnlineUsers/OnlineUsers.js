import "../style.css";

function OnlineUsers(props) {
    const { user } = props;
    return (
        <>
            <div className="userInfo">Welcome {" "}
                <label id="myName">{user}</label> !!
            </div>
            <div>
                <ul id="onlineUsers"/>
            </div>
        </>
    );
}

export default OnlineUsers;
