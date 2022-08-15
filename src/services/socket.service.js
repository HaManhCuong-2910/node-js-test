class SocketServices{

    //connection socket
    connection( socket ){
        console.log(`User connect is ${socket.id}`);
        // console.log(socket.request.session);
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        })

        // event on here

        socket.on('user-chat-message', (msg, name) => {
             _io.emit('admin-receive-message', msg,name);
        })
        socket.on('admin-chat-message', (msg, name) => {
            _io.emit('user-receive-message', msg,name);
        })

    }
}

module.exports = new SocketServices();