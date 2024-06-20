const path = require('path') 
const http = require('http') 
const express = require('express') 
const socketio = require('socket.io') 
  
const app = express() 
 
const server = http.createServer(app) 
  
const io = socketio(server) 
 
const port = 3000; 
const publicDirectoryPath = path.join(__dirname, '../public') 
 
app.use(express.static(publicDirectoryPath)) 
 
let count = 0;
io.on('connection', (socket) => { 
    console.log('New WebSocket connection');

    //emit event to every connection except me
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('increment', () => { 
        count++;

        //emit event to all connection
        io.emit('countUpdated', count);
        
        //emit event to that particular connection(socket) 
        //socket.emit('countUpdated', count); 
    }) 
}) 
 
server.listen(port, () => { 
    console.log(`Server is up on port ${port}!`) 
});