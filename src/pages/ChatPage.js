import OnlineUsers from "../components/OnlineUsers/OnlineUsers";
import "../components/style.css"
// import {FirebaseAuthConsumer} from "@react-firebase/auth";
import io from "socket.io-client";
import {useEffect, dangerouuslySetInnerHTML} from "react";
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
    var allChatMessages = [];
    var chatNotificationCount = [];
    var myUser = [];
    var myFriend = {};
    var $ = require("jquery");

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
            if (myFriend.id === sender.id) {
                $('#notifyTyping').text(sender.name + ' is typing ...');
            }
            setTimeout(function () {
                $('#notifyTyping').text('');
            }, 1000);
        });

        // Listen to onlineUsers event to update the list of online users
        socket.on('onlineUsers', function (onlineUsers) {
            var usersList = '';

            if (onlineUsers.length === 2) {
                console.log('this random if block')
                onlineUsers.forEach(function (user) {
                    if (myUser.id !== user.id) {
                        myFriend.id = user.id;
                        myFriend.name = user.name;
                        $('#form').show();
                        $('#messages').show();
                    }
                });
            }

            onlineUsers.forEach(function (user) {
                if (user.id !== myUser.id) {
                    console.log('user.id = ' + user.id);
                    console.log('myUser.id = ' + myUser.id);
                    console.log('friend name = ' + user.name)
                    var activeClass = (user.id === myFriend.id) ? 'active' : '';
                    var userid = user.id
                    usersList += '<li id="' + user.id + '" class="' + activeClass + '" ><a href="javascript:void(0)">' + user.name + '</a><label class="chatNotificationCount"></label></li>';
                    $(document).ready(function() {document.getElementById(userid).addEventListener("click", () => selectUserChatBox(this, user.id, user.name), false)})
                }
            });
            $('#onlineUsers').html(usersList);

        });

        // Listen to chantMessage event to receive a message sent by my friend
        socket.on('chatMessage', function (message) {
            appendChatMessage(message);
        });

        // Listen to userIsDisconnected event to remove its chat history from chatbox
        socket.on('userIsDisconnected', function (userId) {
            delete allChatMessages[userId];
            $('#form').hide();
            $('#messages').hide();
        });

        return () => socket.disconnect();
    }, []);

    function selectUserChatBox(element, userId, userName) {
        myFriend.id = userId;
        myFriend.name = userName;

        $('#form').show();
        $('#messages').show();
        $('#onlineUsers li').removeClass('active');
        $(element).addClass('active');
        $('#notifyTyping').text('');
        $('#m').val('').focus();

        // Reset chat message count to 0
        clearChatNotificationCount(userId);

        // load all chat message for selected user
        if (allChatMessages[userId] !== undefined) {
            loadChatBox(allChatMessages[userId]);
        } else {
            $('#messages').html('');
        }
    }

    const loginMe = (user) => {
        // var person = prompt("Please enter a username:", "");//user;
        // $('#user').val(person);
        // socket.emit('newUser', person);
        console.log('registered name ' + user)
        socket.emit('newUser', user)
    }

    const appendChatMessage = (message) => {
        if (message.receiver === myUser.id && message.sender === myFriend.id) {
            // playNewMessageAudio();
            var cssClass = (message.sender === myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
            $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
        } else {
            // playNewMessageNotificationAudio();
            updateChatNotificationCount(message.sender);
        }

        if (allChatMessages[message.sender] !== undefined) {
            allChatMessages[message.sender].push(message);
        } else {
            allChatMessages[message.sender] = new Array(message);
        }

        return false;
    }

// Function to update chat notifocation count
    function updateChatNotificationCount(userId) {
        var count = (chatNotificationCount[userId] === undefined) ? 1 : chatNotificationCount[userId] + 1;
        chatNotificationCount[userId] = count;
        $('#' + userId + ' label.chatNotificationCount').html(count);
        $('#' + userId + ' label.chatNotificationCount').show();
    }

// Function to clear chat notification count to 0
    function clearChatNotificationCount(userId) {
        chatNotificationCount[userId] = 0;
        $('#' + userId + ' label.chatNotificationCount').hide();
    }


    function loadChatBox(messages) {
        $('#messages').html('');
        messages.forEach(function (message) {
            var cssClass = (message.sender === myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
            $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
        });
    }

    const submitFunction = (e) => {
        e.preventDefault()
        var message = {};
        const text = $('#m').val();

        if (text !== '') {
            message.text = text ;
            message.sender = myUser.id;
            message.receiver = myFriend.id;
            console.log(message.text);
            $('#messages').append('<li class="chatMessageRight">' + message.text + '</li>');

            if (allChatMessages[myFriend.id] !== undefined) {
                allChatMessages[myFriend.id].push(message);
            } else {
                allChatMessages[myFriend.id] = new Array(message);
            }
            socket.emit('chatMessage', message);
        }

        $('#m').val('').focus();
        return false;
    }

    const notifyTyping = () => {
        socket.emit('notifyTyping', myUser, myFriend);
    }



    return (
        <>

            <AppShell/>
            <div className="onlineUsersContainer">
                <FirebaseAuthConsumer>
                    {({user}) => <OnlineUsers username={user.displayName} onload={loginMe(user.displayName)} selectUserChatBox={selectUserChatBox}/>}
                    {/*{({ user }) => <OnlineUsers user={user.displayName} onload={loginMe(user.displayName)}/>}*/}
                    {/*{({user}) =>*/}
                    {/*    <>*/}
                    {/*        <div className="userInfo" onload={loginMe(user.displayName)}>Welcome {" "}*/}
                    {/*            <label id="myName">{user.displayName}</label> !!*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <ul id="onlineUsers"/>*/}
                    {/*        </div>*/}
                    {/*    </>*/}
                    {/*}*/}
                </FirebaseAuthConsumer>
            </div>
            <div className="chatContainer">
                <ul id="messages"/>
                <span id="notifyTyping"/>
                <form id="form" action="" onSubmit={(e) => submitFunction(e)}>
                    <input type="hidden" id="user" value=""/>
                    <input id="m" autoComplete="off" placeholder="Type your message here.."
                           onKeyUp={() => notifyTyping()}/>
                    <input type="submit" id="button" value="Send"/>
                </form>
            </div>
        </>
    );
}

export default ChatPage;


