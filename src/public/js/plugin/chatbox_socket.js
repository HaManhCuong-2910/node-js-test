var socket = io();
$('#fab_send').click(()=>{
    let message = $('#chatSend').val();
    let nameUser = 'Cường';
    let htmlSendChat = '<div class="d-flex flex-column align-items-end">'+
                            '<span class="chat_msg_item chat_msg_item_user">' + message + '</span>' +
                            '<span class="status">'+formatDate(new Date())+'</span>' +
                        '</div>';
    $('#chat_converse').append(htmlSendChat);
    socket.emit('user-chat-message', message,nameUser);
})
socket.on("user-receive-message", (message,name) => {
    let htmlSendChat =  '<div class="d-flex flex-column align-items-start">'+
                             '<span class="chat_msg_item chat_msg_item_admin">' + message + '</span>'+
                            '<span class="status2">'+formatDate(new Date())+'</span>';
                        '</div>'; 
    $('#chat_converse').append(htmlSendChat);
    console.log(name + ":"+ message);
})