// // import openSocket from 'socket.io-client';
// //
// import {io} from "socket.io-client";
// import openSocket from "socket.io-client";
//
//
// // import socketIOClient from "socket.io-client";
// // import {useRef} from "react";
// // // <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
// var socket = openSocket('http://localhost:3030');
// // const socketRef = socketIOClient("http://localhost:3000");
// // // const socket = socketIOClient('http://localhost:8000');
//
// // var socket = io();
// var allChatMessages = [];
// var chatNotificationCount = [];
// var myUser = {};
// var myFriend = {};
// var $ = require( "jquery" );
//
//
// // Document Ready function called automatically on page load
// // $(document).ready(function(){
// //     loginMe();
// // });
//
// // Function to ask user to supply his/her name before entering a chatbox
// export function loginMe(name) {
//
//     socket.emit('newUser', name);
//     // console.log('here');
//
//     // var person = prompt("Please enter your name:", "Stuart/ZhengLin");
//     // if (/([^\s])/.test(person) && person != null && person !== "") {
//     //     //$('#user').val(person);
//     //     socket.emit('newUser', person);
//     //     document.title = person;
//     // } else {
//     //     window.location.reload();
//     // }
// }
//
// // Function to be called when sent a message from chatbox
// export function submitFunction() {
//     var message = {};
//     const text = $('#m').val();
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
// // function to emit an even to notify friend that I am typing a message
// export function notifyTyping() {
//     socket.emit('notifyTyping', myUser, myFriend);
// }
//
// // Load all messages for the selected user
// export function loadChatBox(messages) {
//     $('#messages').html('');
//     messages.forEach(function(message){
//         var cssClass = (message.sender == myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
//         $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
//     });
// }
//
// // Append a single chant message to the chatbox
// export function appendChatMessage(message) {
//     if(message.receiver == myUser.id && message.sender == myFriend.id) {
//         playNewMessageAudio();
//         var cssClass = (message.sender == myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
//         $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
//     } else {
//         playNewMessageNotificationAudio();
//         updateChatNotificationCount(message.sender);
//     }
//
//     if(allChatMessages[message.sender] != undefined) {
//         allChatMessages[message.sender].push(message);
//     } else {
//         allChatMessages[message.sender] = new Array(message);
//     }
// }
//
// // Function to play a audio when new message arrives on selected chatbox
// export function playNewMessageAudio() {
//     (new Audio('https://notificationsounds.com/soundfiles/8b16ebc056e613024c057be590b542eb/file-sounds-1113-unconvinced.mp3')).play();
// }
//
// // Function to play a audio when new message arrives on selected chatbox
// export function playNewMessageNotificationAudio() {
//     (new Audio('https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3')).play();
// }
//
// // Function to update chat notifocation count
// export function updateChatNotificationCount(userId) {
//     var count = (chatNotificationCount[userId] == undefined) ? 1 : chatNotificationCount[userId] + 1;
//     chatNotificationCount[userId] = count;
//     $('#' + userId + ' label.chatNotificationCount').html(count);
//     $('#' + userId + ' label.chatNotificationCount').show();
// }
//
// // Function to clear chat notifocation count to 0
// export function clearChatNotificationCount(userId) {
//     chatNotificationCount[userId] = 0;
//     $('#' + userId + ' label.chatNotificationCount').hide();
// }
//
//
// // Function to be called when a friend is selected from the list of online users
// export function selectUserChatBox(element, userId, userName) {
//     myFriend.id = userId;
//     myFriend.name = userName;
//
//     $('#form').show();
//     $('#messages').show();
//     $('#onlineUsers li').removeClass('active');
//     $(element).addClass('active');
//     $('#notifyTyping').text('');
//     $('#m').val('').focus();
//
//     // Reset chat message count to 0
//     clearChatNotificationCount(userId);
//
//     // load all chat message for selected user
//     if(allChatMessages[userId] != undefined) {
//         loadChatBox(allChatMessages[userId]);
//     } else {
//         $('#messages').html('');
//     }
// }
//
// // ############# Event listeners and emitters ###############
// // Listen to newUser even to set client with the current user information
// socket.on('newUser', function(newUser){
//     myUser = newUser;
//     $('#myName').html(myUser.name);
// });
//
// // Listen to notifyTyping event to notify that the friend id typying a message
// socket.on('notifyTyping', function(sender, recipient){
//     if(myFriend.id == sender.id) {
//         $('#notifyTyping').text(sender.name + ' is typing ...');
//     }
//     setTimeout(function(){ $('#notifyTyping').text(''); }, 5000);
// });
//
// // Listen to onlineUsers event to update the list of online users
// socket.on('onlineUsers', function(onlineUsers){
//     var usersList = '';
//
//     if(onlineUsers.length == 2) {
//         onlineUsers.forEach(function(user){
//             if(myUser.id != user.id){
//                 myFriend.id = user.id;
//                 myFriend.name = user.name;
//                 $('#form').show();
//                 $('#messages').show();
//             }
//         });
//     }
//
//     onlineUsers.forEach(function(user){
//         if(user.id != myUser.id) {
//             var activeClass = (user.id == myFriend.id) ? 'active' : '';
//             usersList += '<li id="' + user.id + '" class="' + activeClass + '" onclick="selectUerChatBox(this, \'' + user.id + '\', \'' + user.name + '\')"><a href="javascript:void(0)">' + user.name + '</a><label class="chatNotificationCount"></label></li>';
//         }
//     });
//     $('#onlineUsers').html(usersList);
// });
//
// // Listen to chantMessage event to receive a message sent by my friend
// socket.on('chatMessage', function(message){
//     appendChatMessage(message);
// });
//
// // Listen to userIsDisconnected event to remove its chat history from chatbox
// socket.on('userIsDisconnected', function(userId){
//     delete allChatMessages[userId];
//     $('#form').hide();
//     $('#messages').hide();
// });










// // // this is the file for the logic behind the chat app
// // import openSocket from 'socket.io-client';
// //
// // import {io} from "socket.io-client";
// // import socketIOClient from "socket.io-client";
// // // <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
// // // var socket = io.connect('http://localhost:3000');
// // // const socket = socketIOClient('http://localhost:8000');
// //
// // var socket = io();
// // var allChatMessages = [];
// // var chatNotificationCount = [];
// // var myUser = {};
// // var myFriend = {};
// // var $ = require( "jquery" );
// //
// // // Document Ready function called automatically on page load
// // // $(document).ready(function(){
// // //     // loginMe();
// // //     socket.emit('newUser', $('#myName').html(myUser));
// // // });
// //
// // // Function to ask user to supply his/her name before entering a chatbox
// // export function loginMe(name) {
// //
// //     socket.emit('newUser', name);
// //     // console.log('here');
// //
// //     // var person = prompt("Please enter your name:", "Stuart/ZhengLin");
// //     // if (/([^\s])/.test(person) && person != null && person !== "") {
// //     //     //$('#user').val(person);
// //     //     socket.emit('newUser', person);
// //     //     document.title = person;
// //     // } else {
// //     //     window.location.reload();
// //     // }
// // }
// //
// // // Function to be called when sent a message from chatbox
// // export function submitFunction() {
// //     var message = {};
// //     const text = $('#m').val();
// //
// //     if(text !== '') {
// //         message.text = text;
// //         message.sender = myUser.id;
// //         message.receiver = myFriend.id;
// //
// //         $('#messages').append('<li class="chatMessageRight">' + message.text + '</li>');
// //
// //         if(allChatMessages[myFriend.id] !== undefined) {
// //             allChatMessages[myFriend.id].push(message);
// //         } else {
// //             allChatMessages[myFriend.id] = new Array(message);
// //         }
// //         socket.emit('chatMessage', message);
// //     }
// //
// //     $('#m').val('').focus();
// //     return false;
// // }
// //
// // // function to emit an even to notify friend that I am typing a message
// // export function notifyTyping() {
// //     socket.emit('notifyTyping', myUser, myFriend);
// // }
// //
// // // Load all messages for the selected user
// // function loadChatBox(messages) {
// //     $('#messages').html('');
// //     messages.forEach(function(message){
// //         var cssClass = (message.sender === myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
// //         $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
// //     });
// // }
// //
// // // Append a single chant message to the chatbox
// // function appendChatMessage(message) {
// //     if(message.receiver === myUser.id && message.sender === myFriend.id) {
// //         playNewMessageAudio();
// //         var cssClass = (message.sender === myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
// //         $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
// //     } else {
// //         playNewMessageNotificationAudio();
// //         updateChatNotificationCount(message.sender);
// //     }
// //
// //     if(allChatMessages[message.sender] !== undefined) {
// //         allChatMessages[message.sender].push(message);
// //     } else {
// //         allChatMessages[message.sender] = new Array(message);
// //     }
// // }
// //
// // // Function to play a audio when new message arrives on selected chatbox
// // function playNewMessageAudio() {
// //     (new Audio('https://notificationsounds.com/soundfiles/8b16ebc056e613024c057be590b542eb/file-sounds-1113-unconvinced.mp3')).play();
// // }
// //
// // // Function to play a audio when new message arrives on selected chatbox
// // function playNewMessageNotificationAudio() {
// //     (new Audio('https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3')).play();
// // }
// //
// // // Function to update chat notifocation count
// // function updateChatNotificationCount(userId) {
// //     var count = (chatNotificationCount[userId] === undefined) ? 1 : chatNotificationCount[userId] + 1;
// //     chatNotificationCount[userId] = count;
// //     $('#' + userId + ' label.chatNotificationCount').html(count);
// //     $('#' + userId + ' label.chatNotificationCount').show();
// // }
// //
// // // Function to clear chat notifocation count to 0
// // function clearChatNotificationCount(userId) {
// //     chatNotificationCount[userId] = 0;
// //     $('#' + userId + ' label.chatNotificationCount').hide();
// // }
// //
// //
// // // Function to be called when a friend is selected from the list of online users
// // function selectUserChatBox(element, userId, userName) {
// //     myFriend.id = userId;
// //     myFriend.name = userName;
// //
// //     $('#form').show();
// //     $('#messages').show();
// //     $('#onlineUsers li').removeClass('active');
// //     $(element).addClass('active');
// //     $('#notifyTyping').text('');
// //     $('#m').val('').focus();
// //
// //     // Reset chat message count to 0
// //     clearChatNotificationCount(userId);
// //
// //     // load all chat message for selected user
// //     if(allChatMessages[userId] !== undefined) {
// //         loadChatBox(allChatMessages[userId]);
// //     } else {
// //         $('#messages').html('');
// //     }
// // }
// //
// // // ############# Event listeners and emitters ###############
// // // Listen to newUser even to set client with the current user information
// // socket.on('newUser', function(newUser){
// //     myUser = newUser;
// //     $('#myName').html(myUser.name);
// // });
// //
// // // Listen to notifyTyping event to notify that the friend id typying a message
// // socket.on('notifyTyping', function(sender, recipient){
// //     if(myFriend.id === sender.id) {
// //         $('#notifyTyping').text(sender.name + ' is typing ...');
// //     }
// //     setTimeout(function(){ $('#notifyTyping').text(''); }, 5000);
// // });
// //
// // // Listen to onlineUsers event to update the list of online users
// // socket.on('onlineUsers', function(onlineUsers){
// //     var usersList = '';
// //
// //     if(onlineUsers.length === 2) {
// //         onlineUsers.forEach(function(user){
// //             if(myUser.id !== user.id){
// //                 myFriend.id = user.id;
// //                 myFriend.name = user.name;
// //                 $('#form').show();
// //                 $('#messages').show();
// //             }
// //         });
// //     }
// //
// //     onlineUsers.forEach(function(user){
// //         if(user.id !== myUser.id) {
// //             var activeClass = (user.id === myFriend.id) ? 'active' : '';
// //             usersList += '<li id="' + user.id + '" class="' + activeClass + '" onclick="selectUserChatBox(this, \'' + user.id + '\', \'' + user.name + '\')"><a href="javascript:void(0)">' + user.name + '</a><label class="chatNotificationCount"></label></li>';
// //         }
// //     });
// //     $('#onlineUsers').html(usersList);
// // });
// //
// // // Listen to chantMessage event to receive a message sent by my friend
// // socket.on('chatMessage', function(message){
// //     appendChatMessage(message);
// // });
// //
// // // Listen to userIsDisconnected event to remove its chat history from chatbox
// // socket.on('userIsDisconnected', function(userId){
// //     delete allChatMessages[userId];
// //     $('#form').hide();
// //     $('#messages').hide();
// // });
//
//
//
//
// // TEST #################################################################
// // this is the file for the logic behind the chat app



// let allChatMessages = [];
// var chatNotificationCount = [];
// var myUser = {};
// var myFriend = {};
// var $ = require( "jquery" );
//
// // Document Ready function called automatically on page load
// // $(document).ready(function(){
// //     // loginMe();
// //     socket.emit('newUser', $('#myName').html(myUser));
// // });
//
// // Function to ask user to supply his/her name before entering a chatbox
// export function loginMe(name) {
//
//     socketRef.emit('newUser', name);
//     // console.log('here');
//
//     // var person = prompt("Please enter your name:", "Stuart/ZhengLin");
//     // if (/([^\s])/.test(person) && person != null && person !== "") {
//     //     //$('#user').val(person);
//     //     socket.emit('newUser', person);
//     //     document.title = person;
//     // } else {
//     //     window.location.reload();
//     // }
// }
//
// // Function to be called when sent a message from chatbox
// export function submitFunction() {
//     var message = {};
//     const text = $('#m').val();
//
//     if(text !== '') {
//         message.text = text;
//         message.sender = myUser.id;
//         message.receiver = myFriend.id;
//
//         $('#messages').append('<li class="chatMessageRight">' + message.text + '</li>');
//
//         if(allChatMessages[myFriend.id] !== undefined) {
//             allChatMessages[myFriend.id].push(message);
//         } else {
//             allChatMessages[myFriend.id] = new Array(message);
//         }
//         socketRef.emit('chatMessage', message);
//     }
//
//     $('#m').val('').focus();
//     return false;
// }
//
// // function to emit an even to notify friend that I am typing a message
// export function notifyTyping() {
//     socketRef.emit('notifyTyping', myUser, myFriend);
// }
//
// // Load all messages for the selected user
// function loadChatBox(messages) {
//     $('#messages').html('');
//     messages.forEach(function(message){
//         var cssClass = (message.sender === myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
//         $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
//     });
// }
//
// // Append a single chant message to the chatbox
// function appendChatMessage(message) {
//     if(message.receiver === myUser.id && message.sender === myFriend.id) {
//         playNewMessageAudio();
//         var cssClass = (message.sender === myUser.id) ? 'chatMessageRight' : 'chatMessageLeft';
//         $('#messages').append('<li class="' + cssClass + '">' + message.text + '</li>');
//     } else {
//         playNewMessageNotificationAudio();
//         updateChatNotificationCount(message.sender);
//     }
//
//     if(allChatMessages[message.sender] !== undefined) {
//         allChatMessages[message.sender].push(message);
//     } else {
//         allChatMessages[message.sender] = new Array(message);
//     }
// }
//
// // Function to play a audio when new message arrives on selected chatbox
// function playNewMessageAudio() {
//     (new Audio('https://notificationsounds.com/soundfiles/8b16ebc056e613024c057be590b542eb/file-sounds-1113-unconvinced.mp3')).play();
// }
//
// // Function to play a audio when new message arrives on selected chatbox
// function playNewMessageNotificationAudio() {
//     (new Audio('https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3')).play();
// }
//
// // Function to update chat notifocation count
// function updateChatNotificationCount(userId) {
//     var count = (chatNotificationCount[userId] === undefined) ? 1 : chatNotificationCount[userId] + 1;
//     chatNotificationCount[userId] = count;
//     $('#' + userId + ' label.chatNotificationCount').html(count);
//     $('#' + userId + ' label.chatNotificationCount').show();
// }
//
// // Function to clear chat notifocation count to 0
// function clearChatNotificationCount(userId) {
//     chatNotificationCount[userId] = 0;
//     $('#' + userId + ' label.chatNotificationCount').hide();
// }
//
//
// // Function to be called when a friend is selected from the list of online users
// function selectUserChatBox(element, userId, userName) {
//     myFriend.id = userId;
//     myFriend.name = userName;
//
//     $('#form').show();
//     $('#messages').show();
//     $('#onlineUsers li').removeClass('active');
//     $(element).addClass('active');
//     $('#notifyTyping').text('');
//     $('#m').val('').focus();
//
//     // Reset chat message count to 0
//     clearChatNotificationCount(userId);
//
//     // load all chat message for selected user
//     if(allChatMessages[userId] !== undefined) {
//         loadChatBox(allChatMessages[userId]);
//     } else {
//         $('#messages').html('');
//     }
// }
//
// // ############# Event listeners and emitters ###############
// // Listen to newUser even to set client with the current user information
// socketRef.on('newUser', function(newUser){
//     myUser = newUser;
//     $('#myName').html(myUser.name);
// });
//
// // Listen to notifyTyping event to notify that the friend id typying a message
// socketRef.on('notifyTyping', function(sender, recipient){
//     if(myFriend.id === sender.id) {
//         $('#notifyTyping').text(sender.name + ' is typing ...');
//     }
//     setTimeout(function(){ $('#notifyTyping').text(''); }, 5000);
// });
//
// // Listen to onlineUsers event to update the list of online users
// socketRef.on('onlineUsers', function(onlineUsers){
//     var usersList = '';
//
//     if(onlineUsers.length === 2) {
//         onlineUsers.forEach(function(user){
//             if(myUser.id !== user.id){
//                 myFriend.id = user.id;
//                 myFriend.name = user.name;
//                 $('#form').show();
//                 $('#messages').show();
//             }
//         });
//     }
//
//     onlineUsers.forEach(function(user){
//         if(user.id !== myUser.id) {
//             var activeClass = (user.id === myFriend.id) ? 'active' : '';
//             usersList += '<li id="' + user.id + '" class="' + activeClass + '" onclick="selectUserChatBox(this, \'' + user.id + '\', \'' + user.name + '\')"><a href="javascript:void(0)">' + user.name + '</a><label class="chatNotificationCount"></label></li>';
//         }
//     });
//     $('#onlineUsers').html(usersList);
// });
//
// // Listen to chantMessage event to receive a message sent by my friend
// socketRef.on('chatMessage', function(message){
//     appendChatMessage(message);
// });
//
// // Listen to userIsDisconnected event to remove its chat history from chatbox
// socketRef.on('userIsDisconnected', function(userId){
//     delete allChatMessages[userId];
//     $('#form').hide();
//     $('#messages').hide();
// });
