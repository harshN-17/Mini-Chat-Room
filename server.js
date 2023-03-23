const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMsg = require('./Utils/messages');
const {joinUser, getUser} = require('./Utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server); 

//middleware for static files
app.use(express.static(__dirname + '/public')); 

//whenever client connects
io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {
       
        const user = joinUser(socket.id, username, room);

        socket.join(user.room);
        
        socket.emit('message', formatMsg('ChatBot', 'You joined the app'));

        socket.broadcast.to(user.room).emit('message', formatMsg('ChatBot', 'A new User Joined'));
        
    })
    
    socket.on('chatMsg', (msg) => {
        // console.log(msg);
        const user = getUser(socket.id);  
        io.to(user.room).emit('message', formatMsg(user.username, msg));
    })

    //if a user disconnects
    socket.on('disconnect', ()=> {
        io.emit('message', formatMsg('ChatBot', 'Someone Disconnected'));
    })
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is listening at ${PORT}`));