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
$('#attachmentfiles').change(()=>{
    let formData = new FormData();
    formData.append('type', 'user');
    if (localStorage.getItem('it.room-id') != undefined) {
        formData.append('roomid', localStorage.getItem('it.room-id'));
    }
    let listFiles = $('#attachmentfiles').prop('files');

    for(let i=0; i<listFiles.length; i++){
        formData.append('attachFile[]', listFiles[i]);
    }

    $.ajax({
        url: '/chatbox/send-files',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (obj) {
            let status = obj.status;
            let message = obj.mess;
            if(status == 1){
                sendChat(message,'',obj.roomID,false);
            }
            else if(status == 2){
                localStorage.setItem('it.room-id',obj.roomID);
                sendChat(message,'',obj.roomID,false);
            }
            else{
                console.log("no send...");
            }
        },
        error: function (obj) {
            console.log(obj);
        }
    })

    
})
socket.on("user-receive-message", (message,isMess) => {
    let htmlSendChat = '';
    if(isMess){
        htmlSendChat = '<div class="d-flex flex-column align-items-start">' +
            '<span class="chat_msg_item chat_msg_item_admin">' + message + '</span>' +
            '<span class="status2">' + formatDate(new Date()) + '</span>';
        '</div>';
    }
    else{
        for(let i=0; i< message.length; i++){
            htmlSendChat += '<div class="d-flex flex-column align-items-start">' +
                '<img class="files-chatbox" src="' + message[i] + '">' +
                '<span class="status2">' + formatDate(new Date()) + '</span>' +
            '</div>';
        }  
    }     
    $('#chat_converse').append(htmlSendChat);
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
                sendChat(message,'',RoomID,true);
            }
            else{
                sendChat(message,RoomID,0,true)
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
                sendChat(message,'',RoomID,true);
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
            let result_list = appendChatFile_Mess(list); 
            $('#chat_converse').append(result_list);
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function sendChat(message,err,room,isMess){
    let htmlSendChat = '';
    if(isMess){
        htmlSendChat = '<div class="d-flex flex-column align-items-end">' +
            '<span class="chat_msg_item chat_msg_item_user">' + message + '</span>' +
            '<span class="status">' + formatDate(new Date()) + '</span>' +
        '</div>';
    }
    else{
        for(let i=0; i< message.length; i++){
            htmlSendChat += '<div class="d-flex flex-column align-items-end">' +
                '<img class="files-chatbox" src="' + message[i] + '">' +
                '<span class="status">' + formatDate(new Date()) + '</span>' +
            '</div>';
        }        
    }
    
    $('#chatSend').val('');
    $('#chat_converse').append(htmlSendChat);
    if(room != 0){
        socket.emit('user-chat-message', message, room,isMess);
    }    
}
function appendChatFile_Mess(list) {
    let htmlSendChat = '';
    list.forEach((val)=>{
        if (val.files) {
            if (val.user) {
                for (let i = 0; i < val.user.length; i++) {
                    htmlSendChat += '<div class="d-flex flex-column align-items-end">' +
                        '<img class="files-chatbox" src="' + val.user[i] + '">' +
                        '<span class="status">' + formatDate(new Date(val.date)) + '</span>' +
                        '</div>';
                }
            }
            else {
                for (let i = 0; i < val.admin.length; i++) {
                    htmlSendChat += '<div class="d-flex flex-column align-items-start">' +
                        '<img class="files-chatbox" src="' + val.admin[i] + '">' +
                        '<span class="status2">' + formatDate(new Date(val.date)) + '</span>';
                    '</div>';
                }
            }
        }
        else {
            if (val.user) {
                htmlSendChat += '<div class="d-flex flex-column align-items-end">' +
                    '<span class="chat_msg_item chat_msg_item_user">' + val.user + '</span>' +
                    '<span class="status">' + formatDate(new Date(val.date)) + '</span>' +
                    '</div>';
            }
            else {
                htmlSendChat += '<div class="d-flex flex-column align-items-start">' +
                    '<span class="chat_msg_item chat_msg_item_admin">' + val.admin + '</span>' +
                    '<span class="status2">' + formatDate(new Date(val.date)) + '</span>';
                '</div>';
            }
        }
    });
    return htmlSendChat;
}