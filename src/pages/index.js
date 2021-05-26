// for chat app
import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server);

// const app = require('express')();
// //var http = require('http').Server(app);
// const http = require('http').createServer(app);
// const socketIo = require('socket.io');
// const io = socketIo(http);
// const server = require('http');
// const http = server.createServer(app);
// const socketIo = require('socket.io');
// const io = socketIo(http);
const path = require('path');
const PORT = 3000;

let onlineUsers = [];

// Initialize application with route / (that means root of the application)
app.get('/', function(req, res){
    var express=require('express');
    app.use(express.static(path.join(__dirname)));
    res.sendFile(path.join(__dirname, '../../../chatella2', 'index.html'));
});

// Register events on socket connection
io.on('connection', function(socket){

    // Listen to chantMessage event sent by client and emit a chatMessage to the client
    socket.on('chatMessage', function(message){
        io.to(message.receiver).emit('chatMessage', message);
    });

    // Listen to notifyTyping event sent by client and emit a notifyTyping to the client
    socket.on('notifyTyping', function(sender, receiver){
        io.to(receiver.id).emit('notifyTyping', sender, receiver);
    });

    // Listen to newUser event sent by client and emit a newUser to the client with new list of online users
    socket.on('newUser', function(user){
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
server.listen(PORT, function(){
    console.log('listening on *:3000');
});
