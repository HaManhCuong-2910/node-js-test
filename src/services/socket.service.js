class SocketServices{

    //connection socket
    connection( socket ){
        // console.log(socket.request.session);
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        })

        // event on here

        socket.on('user-chat-message', (msg,room,isMess) => {
             if(!socket.rooms.has(room)){
                socket.join(room);
             }             
             _io.to(room).emit('admin-receive-message', msg,isMess);
             _io.emit('admin-notify-message', room);
        })
        socket.on('admin-chat-message', (msg,room,isMess) => {
            _io.to(room).emit('user-receive-message', msg,isMess);
        })

        socket.on('joinRoom', (RoomID) => {
            socket.leaveAll();
            socket.join(RoomID);
        })

    }
}

module.exports = new SocketServices();