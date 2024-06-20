const socket = io();

socket.on('countUpdated', (count) => { 
    console.log('The count has been updated!', count) 
})

socket.on('message', (message) =>{
    console.log(message);
})

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment') 
})