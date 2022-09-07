var socket = io();
if (localStorage.getItem('it.room-id') != undefined) {
    loadChatBox(localStorage.getItem('it.room-id'));
}

$('#frm_chatuser').submit(function (event) {
    event.preventDefault();
    let message = $('#chatSend').val();
    if (message != '') {
        let RoomID = localStorage.getItem('it.room-id');
        if (RoomID != undefined) {
            updateChatBox(RoomID, 'user', message);
        }
        else {
            $('#chat_converse').html('');
            addChatBox(message, 'user');
        }
    }
})
$('#attachmentfiles').change(() => {
    let formData = new FormData();
    formData.append('type', 'user');
    if (localStorage.getItem('it.room-id') != undefined) {
        formData.append('roomid', localStorage.getItem('it.room-id'));
    }
    let loading = '<div id="loading-files-chatbox" class="d-flex flex-column align-items-end">' +
        '<img class="files-user files-chatbox" style="width: 120px;" src="/imgs/main_imgs/eb707ae7096cc8df384f1bf87dab547a.gif">' +
        '</div>';
    $('#chat_converse').append(loading);



    let listFiles = $('#attachmentfiles').prop('files');

    for (let i = 0; i < listFiles.length; i++) {
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
            if (status == 1) {
                sendChat(message, '', obj.roomID, false);
                $('#loading-files-chatbox').remove();
            }
            else if (status == 2) {
                localStorage.setItem('it.room-id', obj.roomID);
                sendChat(message, '', obj.roomID, false);
                $('#loading-files-chatbox').remove();
            }
            else {
                console.log("no send...");
            }
        },
        error: function (obj) {
            console.log(obj);
        }
    })


})
socket.on("user-receive-message", (message, isMess) => {
    let htmlSendChat = '';
    if (isMess) {
        htmlSendChat = '<div class="d-flex flex-column align-items-start">' +
            '<span class="chat_msg_item chat_msg_item_admin">' + message + '</span>' +
            '<span class="status2">' + formatDate(new Date()) + '</span>';
        '</div>';
    }
    else {
        for (let i = 0; i < message.length; i++) {
            htmlSendChat += '<div class="d-flex flex-column align-items-start">' +
                '<a href="' + message[i] + '" data-fancybox="group">' +
                '<img class="files-admin files-chatbox" src="' + message[i] + '">' +
                '</a>' +
                '<span class="status2">' + formatDate(new Date()) + '</span>' +
                '</div>';
        }
    }
    $('#chat_converse').append(htmlSendChat);
    $('#chat_converse').scrollTop($('#chat_converse')[0].scrollHeight);
})

function addChatBox(message, type) {
    $.ajax({
        url: '/chatbox/add-chatbox',
        data: { message: message, type: type },
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            let status = obj.status;
            let RoomID = obj.mess;
            if (status == 1) {
                localStorage.setItem('it.room-id', RoomID);
                sendChat(message, '', RoomID, true);
            }
            else {
                sendChat(message, RoomID, 0, true)
            }
            // console.log(obj);
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function updateChatBox(RoomID, type, message) {
    $.ajax({
        url: '/chatbox/update-chatbox',
        data: { message: message, type: type, RoomID: RoomID },
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            let status = obj.status;
            let RoomID = obj.mess;
            if (status == 1) {
                sendChat(message, '', RoomID, true);
            }
            else {
                localStorage.removeItem('it.room-id');
                addChatBox(message, 'user');
            }
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function loadChatBox(RoomID) {
    $.ajax({
        url: '/chatbox/load-chatbox',
        data: { RoomID: RoomID },
        dataType: 'json',
        type: 'GET',
        success: function (obj) {
            let list = obj.list;
            let page = obj.page;
            let countPage = obj.countPage;
            socket.emit('joinRoom', RoomID);
            let result_list = appendChatFile_Mess(list);
            $('#chat_converse').html(result_list);

            $('#chat_converse').scroll(function (event) {
                var scroll = $(this).scrollTop();
                let scroll_Prosition = Math.round(scroll);
                if (scroll_Prosition == 0 && page < countPage) {
                    $('#chat_converse').addClass("loading-message");
                    page += 1;
                    setTimeout(() => {
                        pagingChatBox(page, RoomID);
                    }, 200);

                }
            });
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function pagingChatBox(page, RoomID) {
    $.ajax({
        url: '/chatbox/load-chatbox',
        data: { page: page, RoomID: RoomID },
        dataType: 'json',
        type: 'GET',
        success: function (obj) {
            let list = obj.list;
            let result_list = appendChatFile_Mess(list);
            $('#chat_converse').removeClass("loading-message");
            $('#chat_converse').prepend(result_list);
            $('#chat_converse').scrollTop($('#chat_converse')[0].scrollHeight * 0.08);
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function sendChat(message, err, room, isMess) {
    let htmlSendChat = '';
    if (isMess) {
        htmlSendChat = '<div class="d-flex flex-column align-items-end">' +
            '<span class="chat_msg_item chat_msg_item_user">' + message + '</span>' +
            '<span class="status">' + formatDate(new Date()) + '</span>' +
            '</div>';
    }
    else {
        for (let i = 0; i < message.length; i++) {
            htmlSendChat += '<div class="d-flex flex-column align-items-end">' +
                '<a href="' + message[i] + '" data-fancybox="group">' +
                '<img class="files-user files-chatbox" src="' + message[i] + '">' +
                '</a>' +
                '<span class="status">' + formatDate(new Date()) + '</span>' +
                '</div>';
        }
    }

    $('#chatSend').val('');
    $('#chat_converse').append(htmlSendChat);
    $('#chat_converse').scrollTop($('#chat_converse')[0].scrollHeight);
    if (room != 0) {
        socket.emit('user-chat-message', message, room, isMess);
    }
}
function appendChatFile_Mess(list) {
    let htmlSendChat = '';
    list.forEach((val) => {
        if (val.files) {
            if (val.user) {
                for (let i = 0; i < val.user.length; i++) {
                    htmlSendChat += '<div class="d-flex flex-column align-items-end">' +
                        '<a href="' + val.user[i] + '" data-fancybox="group">' +
                        '<img class="files-user files-chatbox" src="' + val.user[i] + '">' +
                        '</a>' +
                        '<span class="status">' + formatDate(new Date(val.date)) + '</span>' +
                        '</div>';
                }
            }
            else {
                for (let i = 0; i < val.admin.length; i++) {
                    htmlSendChat += '<div class="d-flex flex-column align-items-start">' +
                        '<a href="' + val.admin[i] + '" data-fancybox="group">' +
                        '<img class="files-admin files-chatbox" src="' + val.admin[i] + '">' +
                        '</a>' +
                        '<span class="status2">' + formatDate(new Date(val.date)) + '</span>' +
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
                    '<span class="status2">' + formatDate(new Date(val.date)) + '</span>' +
                    '</div>';
            }
        }
    });
    return htmlSendChat;
}