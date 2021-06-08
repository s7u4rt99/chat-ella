var app = require('express')();
// var path = require('path');
var http = require('http');
var server = http.createServer(app);
const socketio = require('socket.io');
// var io = socketio(http);
const port = 4000 //process.env.NODE_ENV === "production" ? 3000 : 3001;

// const cors = require('cors');
// app.use(cors())

const io = socketio(server,{
    cors: {
        origin: "localhost:3000"
    },
});

var onlineUsers = [];

// Initialize appication with route / (that means root of the application)
// app.get('/', function(req, res){
//     var express=require('express');
//     app.use(express.static(path.join(__dirname)));
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
//
// // // Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../front_end/build')));

// Register events on socket connection
io.on('connection', function(socket){
    console.log('connected')
    // Listen to chantMessage event sent by client and emit a chatMessage to the client
    socket.on('chatMessage', function(message){
        io.to(message.receiver).emit('chatMessage', message);
    });

    // Listen to notifyTyping event sent by client and emit a notifyTyping to the client
    socket.on('notifyTyping', function(sender, receiver){
        io.to(receiver.id).emit('notifyTyping', sender, receiver);
    });

    // Listen to newUser event sent by client and emit a newUser to the client with new list of online user
    socket.on('newUser', function(user){
        console.log('newUser registered');
        console.log(user);
        var newUser = {id: socket.id, name: user};
        onlineUsers.push(newUser);
        io.to(socket.id).emit('newUser', newUser);
        io.emit('onlineUsers', onlineUsers);
    });

    // Listen to disconnect event sent by client and emit userIsDisconnected and onlineUsers (with new list of online users) to the client
    socket.on('disconnect', function(){
        onlineUsers.forEach(function(user, index){
            if(user.id === socket.id) {
                onlineUsers.splice(index, 1);
                io.emit('userIsDisconnected', socket.id);
                io.emit('onlineUsers', onlineUsers);
            }
        });
    });

});

// Listen application request on port 3000
// http.listen(process.env.PORT || 3000, function (){
//     console.log('listening on *:3000');
// });
server.listen(port, () => console.log(`listening on ${port}`));













// // for chat app
// // import { Server } from 'socket.io';
// // import express from 'express';
// // import { createServer } from 'http';
//
// // var app = require('express')();
// // var http = require('http').createServer(app);
//
// // Listen application request on port 3000
// // let server = app.listen(3000, function(){
// //     console.log('listening on *:3000');
// // });
// // const server = require("./src/pages/routes");
// // app.use(server);
// var io = require('socket.io')() //require('socket.io')(http);
//
// // const express = require("express");
// // const  createProxyMiddleware  = require('http-proxy-middleware');
// // const app = express();
// // const http = require("http").Server(app);
// // var io = require('socket.io')() //require('socket.io')(http);
// // app.use('/', createProxyMiddleware({
// //     target: "http://localhost:3000",
// //     changeOrigin: true
// // }));
//
// // const app = express();
// // const server = createServer(app);
// // const io = new Server(server);
//
// // const app = require('express')();
// // //var http = require('http').Server(app);
// // const http = require('http').createServer(app);
// // const socketIo = require('socket.io');
// // const io = socketIo(http);
// // const server = require('http');
// // const http = server.createServer(app);
// // const socketIo = require('socket.io');
// // const io = socketIo(http);
// // const path = require('path');
// // const PORT = 3000;
// const port = 3000;
// let onlineUsers = [];
//
// // Initialize application with route / (that means root of the application)
// // app.get('/', function(req, res){
// //     var express=require('express');
// //     app.use(express.static(path.join(__dirname)));
// //     res.sendFile(path.join(__dirname, '../../../chatella2/public', 'server.html'));
// // });
//
// // Register events on socket connection
// io.on('connection', function(socket){
//     console.log('hello');
//     // Listen to chantMessage event sent by client and emit a chatMessage to the client
//     socket.on('chatMessage', function(message){
//         io.to(message.receiver).emit('chatMessage', message);
//     });
//
//     // Listen to notifyTyping event sent by client and emit a notifyTyping to the client
//     socket.on('notifyTyping', function(sender, receiver){
//         io.to(receiver.id).emit('notifyTyping', sender, receiver);
//     });
//
//     // Listen to newUser event sent by client and emit a newUser to the client with new list of online users
//     socket.on('newUser', function(user){
//         var newUser = {id: socket.id, name: user};
//         onlineUsers.push(newUser);
//         io.to(socket.id).emit('newUser', newUser);
//         io.emit('onlineUsers', onlineUsers);
//     });
//
//     // Listen to disconnect event sent by client and emit userIsDisconnected and onlineUsers (with new list of online users) to the client
//     socket.on('disconnect', function(){
//         onlineUsers.forEach(function(user, index){
//             if(user.id === socket.id) {
//                 onlineUsers.splice(index, 1);
//                 io.emit('userIsDisconnected', socket.id);
//                 io.emit('onlineUsers', onlineUsers);
//             }
//         });
//     });
//
// });
// // http.listen(8080, () => {
// //     console.log("Server started in port " + 8080 + ".");
// // });
// //
// io.listen(port);
// console.log('listening on port ' + port);
//
// //VALENTINOG################################################################
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const path = require("path");
//
// const port = process.env.NODE_ENV === "production" ? 3000 : 3001;
// const index = require("./src/pages/routes/index");
//
// const app = express();
// app.use(index);
//
// const server = http.createServer(app);
//
// const io = socketIo(server);
//
// let onlineUsers = [];
//
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname + "./public/index.html"));
// });
//
// io.on('connection', function(socket){
//     console.log('hello');
//     // Listen to chantMessage event sent by client and emit a chatMessage to the client
//     socket.on('chatMessage', function(message){
//         io.to(message.receiver).emit('chatMessage', message);
//     });
//
//     // Listen to notifyTyping event sent by client and emit a notifyTyping to the client
//     socket.on('notifyTyping', function(sender, receiver){
//         io.to(receiver.id).emit('notifyTyping', sender, receiver);
//     });
//
//     // Listen to newUser event sent by client and emit a newUser to the client with new list of online users
//     socket.on('newUser', function(user){
//         var newUser = {id: socket.id, name: user};
//         onlineUsers.push(newUser);
//         io.to(socket.id).emit('newUser', newUser);
//         io.emit('onlineUsers', onlineUsers);
//     });
//
//     // Listen to disconnect event sent by client and emit userIsDisconnected and onlineUsers (with new list of online users) to the client
//     socket.on('disconnect', function(){
//         onlineUsers.forEach(function(user, index){
//             if(user.id === socket.id) {
//                 onlineUsers.splice(index, 1);
//                 io.emit('userIsDisconnected', socket.id);
//                 io.emit('onlineUsers', onlineUsers);
//             }
//         });
//     });
//
// });
//
// server.listen(port, () => console.log(`Listening on port ${port}`));
//
//
// //STACK EXCHANGE#########################################################
// // const express = require("express");
// // const { createProxyMiddleware } = require('http-proxy-middleware');
// // const http = require("http").Server(app);
// // const io = require("socket.io")(http);
// // const port = 3100;
// //
// // app.use('/', createProxyMiddleware({
// //     target: "http://localhost:3000",
// //     changeOrigin: true
// // }));
// //
// // let onlineUsers = [];
// //
// // io.on('connection', function(socket){
// //     console.log('hello');
// //     // Listen to chantMessage event sent by client and emit a chatMessage to the client
// //     socket.on('chatMessage', function(message){
// //         io.to(message.receiver).emit('chatMessage', message);
// //     });
// //
// //     // Listen to notifyTyping event sent by client and emit a notifyTyping to the client
// //     socket.on('notifyTyping', function(sender, receiver){
// //         io.to(receiver.id).emit('notifyTyping', sender, receiver);
// //     });
// //
// //     // Listen to newUser event sent by client and emit a newUser to the client with new list of online users
// //     socket.on('newUser', function(user){
// //         var newUser = {id: socket.id, name: user};
// //         onlineUsers.push(newUser);
// //         io.to(socket.id).emit('newUser', newUser);
// //         io.emit('onlineUsers', onlineUsers);
// //     });
// //
// //     // Listen to disconnect event sent by client and emit userIsDisconnected and onlineUsers (with new list of online users) to the client
// //     socket.on('disconnect', function(){
// //         onlineUsers.forEach(function(user, index){
// //             if(user.id === socket.id) {
// //                 onlineUsers.splice(index, 1);
// //                 io.emit('userIsDisconnected', socket.id);
// //                 io.emit('onlineUsers', onlineUsers);
// //             }
// //         });
// //     });
// //
// // });
// //
// // http.listen(port, () => {
// //     console.log("Server started in port " + port + ".");
// // });
// ////OTHER################################################################
// // const express = require("express");
// // const cors = require("cors");
// // const http = require("http");
// // const socketIO = require("socket.io");
// // let onlineUsers = [];
// // // setup the port our backend app will run on
// // const PORT = 3030;
// // const NEW_MESSAGE_EVENT = "new-message-event";
// //
// // const app = express();
// // const server = http.createServer(app);
// //
// // const io = socketIO(server, {var app = require('express')();
// // var http = require('http').createServer(app);
// // const PORT = 8080;
// // var io = require('socket.io')(http);
// // http.listen(PORT, () => {
// //     console.log(`listening on *:${PORT}`);
// // });
// //     cors: true,
// //     origins:["localhost:3030"]
// // });
// //
// // app.use(cors());
// //
// // // Hardcoding a room name here. This is to indicate that you can do more by creating multiple rooms as needed.
// // // const room = "general"
// //
// // // io.on("connection", (socket) => {
// // //     socket.join(room);
// // //
// // //     socket.on(NEW_MESSAGE_EVENT, (data) => {
// // //         io.in(room).emit(NEW_MESSAGE_EVENT, data);
// // //     });
// // //
// // //     socket.on("disconnect", () => {
// // //         socket.leave(room);
// // //     });
// // // });
// // // Register events on socket connection
// // io.on('connection', function(socket){
// //     console.log('connected');
// //
// //     // Listen to chantMessage event sent by client and emit a chatMessage to the client
// //     socket.on('chatMessage', function(message){
// //         io.to(message.receiver).emit('chatMessage', message);
// //     });
// //
// //     // Listen to notifyTyping event sent by client and emit a notifyTyping to the client
// //     socket.on('notifyTyping', function(sender, receiver){
// //         io.to(receiver.id).emit('notifyTyping', sender, receiver);
// //     });
// //
// //     // Listen to newUser event sent by client and emit a newUser to the client with new list of online users
// //     socket.on('newUser', function(user){
// //         var newUser = {id: socket.id, name: user};
// //         onlineUsers.push(newUser);
// //         io.to(socket.id).emit('newUser', newUser);
// //         io.emit('onlineUsers', onlineUsers);
// //     });
// //
// //     // Listen to disconnect event sent by client and emit userIsDisconnected and onlineUsers (with new list of online users) to the client
// //     socket.on('disconnect', function(){
// //         onlineUsers.forEach(function(user, index){
// //             if(user.id === socket.id) {
// //                 onlineUsers.splice(index, 1);
// //                 io.emit('userIsDisconnected', socket.id);
// //                 io.emit('onlineUsers', onlineUsers);
// //             }
// //         });
// //     });
// //
// // });
// //
// // server.listen(PORT, () => {
// //     console.log(`listening on *:${PORT}`);
// // });
//
// // OTHERRRR######################################################
// // var app = require('express')();
// // var http = require('http').createServer(app);
// // const PORT = 3000;
// // var io = require('socket.io')(http);
// //
// // http.listen(PORT, () => {
// //     console.log(`listening on *:${PORT}`);
// // });
// //
// // let onlineUsers = [];
// //
// // io.on('connection', function(socket){
// //     console.log('hello');
// //     socket.emit('connection',null);
// //     // Listen to chatMessage event sent by client and emit a chatMessage to the client
// //     io.on('chatMessage', function(message){
// //         socket.to(message.receiver).emit('chatMessage', message);
// //     });
// //
// //     // Listen to notifyTyping event sent by client and emit a notifyTyping to the client
// //     io.on('notifyTyping', function(sender, receiver){
// //         socket.to(receiver.id).emit('notifyTyping', sender, receiver);
// //     });
// //
// //     // Listen to newUser event sent by client and emit a newUser to the client with new list of online users
// //     io.on('newUser', function(user){
// //         var newUser = {id: socket.id, name: user};
// //         onlineUsers.push(newUser);
// //         socket.to(socket.id).emit('newUser', newUser);
// //         socket.emit('onlineUsers', onlineUsers);
// //     });
// //
// //     // Listen to disconnect event sent by client and emit userIsDisconnected and onlineUsers (with new list of online users) to the client
// //     io.on('disconnect', function(){
// //         onlineUsers.forEach(function(user, index){
// //             if(user.id === socket.id) {
// //                 onlineUsers.splice(index, 1);
// //                 socket.emit('userIsDisconnected', socket.id);
// //                 socket.emit('onlineUsers', onlineUsers);
// //             }
// //         });
// //     });
// //
// // });
