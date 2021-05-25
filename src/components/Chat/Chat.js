import {submitFunction, notifyTyping } from "../../pages/chat";

function Chat() {
    return (
        <>
            <ul id="messages"></ul>
            <span id="notifyTyping"></span>
            {/*onSubmit={submitFunction}*/}
            <form id="form" action="" >
                <input type="hidden" id="user" value=""/>
                {/*onKeyUp={notifyTyping}*/}
                <input id="m" autoComplete="off" placeholder="Type your message here.."/>
                <input type="submit" id="button" value="Send"/>
            </form>
        </>
    );
}

// function submitfunction() {
//     var message = {};
//     text = $('#m').val();
//
//     if(text != '') {
//         message.text = text;
//         message.sender = myUser.id;
//         message.receiver = myFriend.id;
//
//         $('#messages').append('<li class="chatMessageRight">' + message.text + '</li>');
//
//         if(allChatMessages[myFriend.id] != undefined) {
//             allChatMessages[myFriend.id].push(message);
//         } else {
//             allChatMessages[myFriend.id] = new Array(message);
//         }
//         socket.emit('chatMessage', message);
//     }
//
//     $('#m').val('').focus();
//     return false;
// }
//
// function notifyTyping() {
//     socket.emit('notifyTyping', myUser, myFriend);
// }

export default Chat;
