class SocketServices{

    //connection socket
    connection( socket ){
        console.log(socket.request.session);
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        })

        // event on here

        socket.on('chat-message', msg => {
            console.log(`msg is:::${msg}`)
            _io.emit('send-chat-message', msg);
        })

    }
}

module.exports = new SocketServices();