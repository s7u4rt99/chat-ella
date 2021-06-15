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
let i = 0;
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
    console.log(i);
    i++;
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
    socket.once('newUser', function(user){
        console.log('newUser registered');
        console.log(user);
        var newUser = {id: socket.id, name: user};
        console.log(newUser.id)
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
        // socket.removeAllListeners();
    });

});

// Listen application request on port 3000
// http.listen(process.env.PORT || 3000, function (){
//     console.log('listening on *:3000');
// });
server.listen(port, () => console.log(`listening on ${port}`));






// var app = require('express')();
// // var path = require('path');
// var http = require('http');
// var server = http.createServer(app);
// const socketio = require('socket.io');
// // var io = socketio(http);
// const port = 4000 //process.env.NODE_ENV === "production" ? 3000 : 3001;
//
// // const cors = require('cors');
// // app.use(cors())
//
// const io = socketio(server,{
//     cors: {
//         origin: "localhost:3000"
//     },
// });
//
// var onlineUsers = [];
//
// // Initialize appication with route / (that means root of the application)
// // app.get('/', function(req, res){
// //     var express=require('express');
// //     app.use(express.static(path.join(__dirname)));
// //     res.sendFile(path.join(__dirname, 'index.html'));
// // });
// //
// // // // Have Node serve the files for our built React app
// // app.use(express.static(path.resolve(__dirname, '../front_end/build')));
//
// // Register events on socket connection
// io.on('connection', function(socket){
//     console.log('connected')
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
//     // Listen to newUser event sent by client and emit a newUser to the client with new list of online user
//     socket.on('newUser', function(user){
//         console.log('newUser registered');
//         console.log(user);
//         var newUser = {id: socket.id, name: user.name, email: user.email};
//         console.log(newUser.id)
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
// // Listen application request on port 3000
// // http.listen(process.env.PORT || 3000, function (){
// //     console.log('listening on *:3000');
// // });
// server.listen(port, () => console.log(`listening on ${port}`));
