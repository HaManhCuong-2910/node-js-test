var socket = io();
if (localStorage.getItem('it.room-id') != undefined) {
    loadChatBox(localStorage.getItem('it.room-id'));
}

$('#fab_send').click(() => {
    let message = $('#chatSend').val();
    let RoomID = localStorage.getItem('it.room-id');
    if (RoomID != undefined) {
        updateChatBox(RoomID,'user',message);
    }
    else {
        $('#chat_converse').html('');
        addChatBox(message,'user');
    }
    
})
socket.on("user-receive-message", (message) => {
    let htmlSendChat = '<div class="d-flex flex-column align-items-start">' +
        '<span class="chat_msg_item chat_msg_item_admin">' + message + '</span>' +
        '<span class="status2">' + formatDate(new Date()) + '</span>';
    '</div>';
    $('#chat_converse').append(htmlSendChat);
    // console.log(message);
})

function addChatBox(message,type) {
    $.ajax({
        url: '/chatbox/add-chatbox',
        data: {message: message,type: type},
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            let status = obj.status;
            let RoomID = obj.mess;
            if(status == 1){
                localStorage.setItem('it.room-id',RoomID);
                sendChat(message,'',RoomID);
            }
            else{
                sendChat(message,RoomID,0)
            }
            // console.log(obj);
        },
        error: function (obj) {
            console.log(obj);
        }
    })
} 
function updateChatBox(RoomID,type,message){
    $.ajax({
        url: '/chatbox/update-chatbox',
        data: {message: message,type: type,RoomID: RoomID},
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            let status = obj.status;
            let RoomID = obj.mess;
            if(status == 1){
                sendChat(message,'',RoomID);
            }
            else{
                localStorage.removeItem('it.room-id');
                addChatBox(message,'user');
            }
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function loadChatBox(RoomID){
    $.ajax({
        url: '/chatbox/load-chatbox',
        data: {RoomID: RoomID},
        dataType: 'json',
        type: 'GET',
        success: function (obj) {
            let list = obj.list;
            socket.emit('joinRoom', RoomID);
            list.forEach((val)=>{
                if(val.user){
                    let htmlSendChat = '<div class="d-flex flex-column align-items-end">' +
                        '<span class="chat_msg_item chat_msg_item_user">' + val.user + '</span>' +
                        '<span class="status">' + formatDate(new Date(val.date)) + '</span>' +
                        '</div>';
                    $('#chat_converse').append(htmlSendChat);
                }
                else{
                    let htmlSendChat = '<div class="d-flex flex-column align-items-start">' +
                        '<span class="chat_msg_item chat_msg_item_admin">' + val.admin + '</span>' +
                        '<span class="status2">' + formatDate(new Date(val.date)) + '</span>';
                    '</div>';
                    $('#chat_converse').append(htmlSendChat);
                } 
            });
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function sendChat(message,err,room){
    let htmlSendChat = '<div class="d-flex flex-column align-items-end">' +
        '<span class="chat_msg_item chat_msg_item_user">' + message + '</span>' +
        '<span class="status">' + formatDate(new Date()) + '</span>' +
        '</div>';
    $('#chatSend').val('');
    $('#chat_converse').append(htmlSendChat);
    if(room != 0){
        socket.emit('user-chat-message', message, room);
    }    
}