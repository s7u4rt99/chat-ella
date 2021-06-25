import OnlineUsers from "../components/OnlineUsers/OnlineUsers";
import "../components/style.css"
// import {FirebaseAuthConsumer} from "@react-firebase/auth";
import io from "socket.io-client";
import {useEffect, dangerouuslySetInnerHTML, useState} from "react";
import AppShell from "../components/Header/AppShell";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import ScriptTag from 'react-script-tag'
// import {appendChatMessage, loginMe, selectUserChatBox} from "../chat";
// import openSocket from "socket.io-client";
// import React, { useEffect, useRef } from "react"
// import io from "socket.io-client"
// import {
//     clearChatNotificationCount, loadChatBox,
//     playNewMessageAudio,
//     playNewMessageNotificationAudio,
//     updateChatNotificationCount
// } from "../chat";

function ChatPage(props) {
    // const {user} = props;
    // const {loginMe, submitFunction, notifyTyping} = props
    // const [file, setFile] = useState()
    let file = null;
    var allChatMessages = [];
    var chatNotificationCount = [];
    var myUser = [];
    var myFriend = {};
    var $ = require("jquery");
    var counter = 0;

    // const socketRef = useRef()
    const socket = io("http://localhost:4000", {
        // withCredentials: true
        // extraHeaders: {
        //     "my-custom-header": "abcd"
        // }
    });

    // var socket = io.connect(SOCKET_SERVER_URL);//;
    useEffect(() => {

        // let socket = io.connect(SOCKET_SERVER_URL);
        console.log('hello')
        // socketRef.current = io(SOCKET_SERVER_URL);
        // ############# Event listeners and emitters ###############
        // Listen to newUser even to set client with the current user information
        socket.on('newUser', function (newUser) {
            myUser = newUser;
            console.log('newUser: ' + myUser.id)
            // $('#myName').html(myUser.name);
        });

        // Listen to notifyTyping event to notify that the friend id typying a message
        socket.on('notifyTyping', function (sender, recipient) {
            if (myFriend.googleId === sender.googleId) {
                $('#notifyTyping').text(sender.name + ' is typing ...');
            }
            setTimeout(function () {
                $('#notifyTyping').text('');
            }, 1000);
        });

        // Listen to onlineUsers event to update the list of online users
        socket.on('onlineUsers', function (onlineUsers) {

            // var userGoogleIdList = [];
            // var userList = [];
            // for (let i = 0; i < onlineUsers.length; i++){
            //     const userGoogleId = onlineUsers[i].googleId;
            //     if (userGoogleIdList.includes(userGoogleId)){
            //         continue;
            //     } else {
            //         userGoogleIdList.push(userGoogleId);
            //         userList.push(onlineUsers[i]);
            //     }
            // }
            // console.log('userLIst length: ' + userList.length);
            if (onlineUsers.length === 2) {
                console.log('this random if block')
                onlineUsers.forEach(function (user) {
                    if (myUser.googleId !== user.googleId) {
                        myFriend.id = user.id;
                        myFriend.name = user.name;
                        myFriend.googleId = user.googleId;
                        $('#form').show();
                        $('#messages').show();
                        // if (allChatMessages[user.googleId] !== undefined) {
                        //     loadChatBox(allChatMessages[user.googleId]);
                        // } else {
                        //     $('#messages').html('');
                        // }
                    }
                });
            }

            var usersList = '';
            onlineUsers.forEach(function (user) {
                if (user.googleId !== myUser.googleId) {
                    console.log('user.id = ' + user.id);
                    console.log('myUser.id = ' + myUser.id);
                    console.log('friend name = ' + user.name)
                    var activeClass = (user.googleId === myFriend.googleId) ? 'active' : '';
                    var userid = user.googleId
                    usersList += '<li id="' + user.googleId + '" class="' + activeClass + '" ><a href="javascript:void(0)">' + user.name + '</a><label class="chatNotificationCount"></label></li>';
                    $(document).ready(function () {
                        document.getElementById(userid).addEventListener("click", () => selectUserChatBox(this, user.id, user.name, user.googleId), false)
                    })
                }
            });
            $('#onlineUsers').html(usersList);

        });

        // Listen to chantMessage event to receive a message sent by my friend
        socket.on('chatMessage', function (message) {
            console.log('msg received');
            appendChatMessage(message);
        });

        // Listen for updateChat event to update message sent in case of multiple window with same google account
        socket.on('updateChat', function (message) {
            console.log('chat updated');
            //$('#messages').append('<li class="chatMessageRight">' + message.text + '</li>');
            updateChat(message);
            //appendChatMessage(message);
        })

        // Listen to userIsDisconnected event to remove its chat history from chatbox
        socket.on('userIsDisconnected', function (googleId) {
            delete allChatMessages[googleId];
            window.localStorage.setItem("history", JSON.stringify(allChatMessages));
            console.log('data saved DC');
            $('#form').hide();
            $('#messages').hide();
        });

        return () => socket.disconnect();
    }, []);

    function selectUserChatBox(element, userId, userName, userGoogleId) {
        myFriend.id = userId;
        myFriend.name = userName;
        myFriend.googleId = userGoogleId;


        $('#form').show();
        $('#messages').show();
        $('#onlineUsers li').removeClass('active');
        $(element).addClass('active');
        $('#notifyTyping').text('');
        $('#m').val('').focus();

        // Reset chat message count to 0
        clearChatNotificationCount(userGoogleId);

        // load all chat message for selected user
        if (allChatMessages[userGoogleId] !== undefined) {
            loadChatBox(allChatMessages[userGoogleId]);
        } else {
            $('#messages').html('');
        }
    }

    const loginMe = (userName, userGoogleId) => {
        // var person = prompt("Please enter a username:", "");//user;
        // $('#user').val(person);
        // socket.emit('newUser', person);
        console.log('registered name ' + userName)
        console.log('googleId: ' + userGoogleId);
        var user = {name: userName, googleId: userGoogleId};
        socket.emit('newUser', user);
        var history = window.localStorage.getItem("history");
        if (history === 'undefined') {
            return;
        } else {
            allChatMessages = JSON.parse(history) || allChatMessages;
            console.log('load save')
            if (allChatMessages[user.googleId] === null || allChatMessages[user.googleId] === undefined) {
                return;
            } else {
                console.log('open save')
                loadChatBox(allChatMessages[user.googleId]);
            }
        }
        // console.log(history);
        // if(history === null){
        //     return;
        // } else {
        //     allChatMessages = history;
        //     //loadChatBox(allChatMessages[user.googleId]);
        // }
        //allChatMessages = history;
    }

    const updateChat = (message) => {
        var origin = message.origin;
        var destination = message.destination;
        if (message.senderGoogleId === myUser.googleId && message.sender.includes(message.origin)) {
            // playNewMessageAudio();
            //var cssClass = (message.senderGoogleId === myUser.googleId) ? 'chatMessageRight' : 'chatMessageLeft';
            $('#messages').append('<li class="chatMessageRight">' + message.text + '</li>');
        } else {
            // playNewMessageNotificationAudio();
            updateChatNotificationCount(message.senderGoogleId);
        }
        if (allChatMessages[message.receiverGoogleId] !== undefined) {
            allChatMessages[message.receiverGoogleId].push(message);
        } else {
            allChatMessages[message.receiverGoogleId] = new Array(message);
        }
        return false;
    }

    const appendChatMessage = (message) => {
        if (message.receiverGoogleId === myUser.googleId && message.senderGoogleId === myFriend.googleId) {
            // playNewMessageAudio();
            var cssClass = (message.senderGoogleId === myUser.googleId) ? 'chatMessageRight' : 'chatMessageLeft';
            if (message.type === "file") {
                appendPhoto(message, cssClass)
                // const blob = new Blob([message.body], { type: message.type });
                // const reader = new FileReader();
                // let imageSrc = null
                // reader.readAsDataURL(blob);
                // reader.onloadend = function() {
                //     imageSrc = reader.result;
                //     $('#messages').append('<li class="' + cssClass + '"><img style={{width:150, height:"auto"}} src="' + imageSrc + '" /></li>');
                // }
                // let imageSrc = reader.result;
            } else {
                // playNewMessageNotificationAudio();

                // var cssClass = (message.sender === myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
                $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
            }
        } else {
            // playNewMessageNotificationAudio();
            updateChatNotificationCount(message.senderGoogleId);
        }
        if (allChatMessages[message.senderGoogleId] !== undefined) {
            allChatMessages[message.senderGoogleId].push(message);
        } else {
            allChatMessages[message.senderGoogleId] = new Array(message);
        }
        return false;
    }

    const appendPhoto = (message, cssClass) => {
        const blob = new Blob([message.body], {type: message.type});
        const reader = new FileReader();
        let imageSrc = null
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            imageSrc = reader.result;
            $('#messages').append('<li class="' + cssClass + '"><img style="max-width:100%;height:"auto"" src="' + imageSrc + '" /></li>');
            let messages = document.getElementById('messages')
            messages && messages.scrollTo(0, messages.scrollHeight)
            $('#m').val('').focus();
        }
    }

// Function to update chat notifocation count
    function updateChatNotificationCount(userGoogleId) {
        var count = (chatNotificationCount[userGoogleId] === undefined) ? 1 : chatNotificationCount[userGoogleId] + 1;
        chatNotificationCount[userGoogleId] = count;
        $('#' + userGoogleId + ' label.chatNotificationCount').html(count);
        $('#' + userGoogleId + ' label.chatNotificationCount').show();
    }

// Function to clear chat notification count to 0
    function clearChatNotificationCount(userGoogleId) {
        chatNotificationCount[userGoogleId] = 0;
        $('#' + userGoogleId + ' label.chatNotificationCount').hide();
    }

    function loadChatBox(messages) {
        $('#messages').html('');
        const len = messages.length;
        console.log(messages);
        for (let i = 0; i < len; i++) {
            console.log(messages[i])
            if (messages[i].type !== "file") {
                var cssClass = (JSON.stringify(messages[i].sender) === JSON.stringify(myUser.id)) ? 'chatMessageRight' : 'chatMessageLeft';
                $('#messages').append('<li class="' + cssClass + '">' + messages[i].text + '</li>');
            } else {
                var cssClass = (JSON.stringify(messages[i].sender) === JSON.stringify(myUser.id)) ? 'chatMessageRight' : 'chatMessageLeft';
                console.log("sender= ", messages[i].sender, " ", cssClass)
                const blob = new Blob([messages[i].body], {type: messages[i].type});
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                let imageSrc = reader.result;
                reader.onloadend = function () {
                    imageSrc = reader.result
                    $("#" + i).html('<img style="max-width:100%;height:"auto"" src="' + imageSrc + '" />')
                    let chat = document.getElementById('messages')
                    chat && chat.scrollTo(0, chat.scrollHeight)
                    $('#m').val('').focus();
                }
                const confirmedCSS = cssClass;
                $('#messages').append('<li id="' + i + '" class="' + confirmedCSS + '"></li>');
            }
        }
        let chat = document.getElementById('messages')
        chat && chat.scrollTo(0, chat.scrollHeight)
        $('#m').val('').focus();
    }

    const submitFunction = (e) => {
        e.preventDefault();
        var message = {};
        const text = $('#m').val();

        if (file) {
            message.sender = myUser.id;
            message.senderGoogleId = myUser.googleId;
            message.receiver = myFriend.id;//array
            message.receiverGoogleId = myFriend.googleId;
            message.type = "file";
            message.mimeType = file.type;
            message.fileName = file.name;
            message.body = file;
            file = null;
            $('#m').val('').focus();
            // need to append to html
            appendPhoto(message, "chatMessageRight")
            // const blob = new Blob([message.body], { type: message.type });
            // const reader = new FileReader();
            // let imageSrc = null
            // reader.readAsDataURL(blob);
            // reader.onloadend = function() {
            //     imageSrc = reader.result;
            //     console.log("imageSrc=", imageSrc);
            //     $('#messages').append('<li class="chatMessageRight"><img style={{width:150, height:"auto"}} src="' + imageSrc + '" /></li>');
            // }
            // let imageSrc = reader.result;
            // alt={' + message.fileName + '}
        } else {
            if (text !== '') {
                message.text = text;
                message.sender = myUser.id;
                message.senderGoogleId = myUser.googleId;
                message.receiver = myFriend.id;
                message.receiverGoogleId = myFriend.googleId;
                message.type = "text";
                console.log(message.text);
                console.log('myfriendid arr size: ' + myFriend.id.length + 'myuserid arr size: ' + myUser.id.length);
                $('#messages').append('<li class="chatMessageRight">' + message.text + '</li>');
                // if (allChatMessages[myFriend.id] !== undefined) {
                //     allChatMessages[myFriend.id].push(message);
                // } else {
                //     allChatMessages[myFriend.id] = new Array(message);
                // }
                // socket.emit('chatMessage', message);
            }

        }

        if (allChatMessages[myFriend.googleId] !== undefined) {
            allChatMessages[myFriend.googleId].push(message);
        } else {
            allChatMessages[myFriend.googleId] = new Array(message);
        }
        socket.emit('chatMessage', message);
        let messages = document.getElementById('messages')
        messages && messages.scrollTo(0, messages.scrollHeight)
        $('#m').val('').focus();
        return false;
    }

    const notifyTyping = () => {
        socket.emit('notifyTyping', myUser, myFriend);
    }

    const selectFile = (e) => {
        e.preventDefault();
        $('#m').val(e.target.files[0] === undefined ? '' : e.target.files[0].name);
        file = e.target.files[0] !== undefined ? e.target.files[0] : null;
    }

    return (
        <>

            <AppShell/>
            <div className="onlineUsersContainer">
                <FirebaseAuthConsumer>
                    {({user}) => <OnlineUsers username={user.displayName} onload={loginMe(user.displayName, user.uid)}
                                              selectUserChatBox={selectUserChatBox}/>}
                </FirebaseAuthConsumer>
            </div>
            <div className="chatContainer">
                <ul id="messages"/>
                <span id="notifyTyping"/>
                <form id="form" action="" onSubmit={(e) => submitFunction(e)}>
                    <input type="hidden" id="user" value=""/>
                    <input id="m" autoComplete="off" placeholder="Type your message here.."
                           onKeyUp={() => notifyTyping()}/>
                    <input onChange={selectFile} type="file" multiple accept="image/*"/>
                    <input type="submit" id="button" value="Send"/>
                </form>
            </div>
        </>
    );
}

export default ChatPage;


