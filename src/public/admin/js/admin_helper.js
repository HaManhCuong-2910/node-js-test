var socket = io();
$('#frm_sendChat').submit(function (event) {
    event.preventDefault();
    let message = $('input[name="message"]', this).val();
    if (message != '') {
        let RoomID = $('input[name="roomIDAdmin"]', this).val();
        $('input[name="message"]', this).val('');
        updateChatBox(RoomID, 'admin', message);
    }
})
socket.on("admin-receive-message", (message, isMess) => {
    let htmlSendChat = '';
    if (isMess) {
        htmlSendChat = '<li class="sender">' +
            '<p> ' + message + ' </p>' +
            '<span class="time">' + formatDate(new Date()) + '</span>';
        '</div>';
    }
    else {
        for (let i = 0; i < message.length; i++) {
            htmlSendChat += '<li class="sender files-li">' +
                '<img class="files-chatbox" src="' + message[i] + '">' +
                '<span class="time">' + formatDate(new Date()) + '</span>' +
                '</li>';
        }
    }
    $('.msg-body ul').append(htmlSendChat);
})
socket.on("admin-notify-message", (room) => {
    loadListUser_Chat();
    console.log('RoomID:' + room);
})



jQuery(document).ready(function () {
    // loadListUser_Chat();


    $(".chat-icon").click(function () {
        $(".chatbox").removeClass('showbox');
    });

    $('#attachmentfiles').change(() => {
        let formData = new FormData();
        formData.append('type', 'admin');
        formData.append('roomid', $('#roomIDAdmin').val());
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
                if (status == 1 || status == 2) {
                    sendChat_admin(message, '', $('#roomIDAdmin').val(), false);
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

});


function loadListUser_Chat() {
    $.ajax({
        url: '/chatbox/load-listchat',
        data: {},
        dataType: 'json',
        type: 'GET',
        success: function (obj) {
            let htmlListUser = '';
            obj.rooms.forEach(val => {
                let checkNoRead = isNoReadChat(val.listMess, true);
                if (checkNoRead) {
                    classNoRead = 'class="font-weight-bold"';
                }
                else {
                    classNoRead = ""
                }
                htmlListUser += '<a href="#" onclick="showbox(' + "'" + val._id + "'" + ',' + checkNoRead + ',this)" class="d-flex chat-items align-items-center">' +
                    '<div class="flex-shrink-0">' +
                    '<img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img">' +
                    '<span class="active"></span>' +
                    '</div>' +
                    '<div class="flex-grow-1 ms-3">' +
                    '<h3 ' + classNoRead + '>' + 'KH ' + val._id.slice(0, 6) + '</h3>' +
                    '<p ' + classNoRead + ' > ' + formatDate(new Date(val.CreationDate)) + '</p>' +
                    '</div>';
            });
            $('#chat-list').html(htmlListUser);
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function isNoReadChat(listMess, isAdmin) {
    if (isAdmin) {
        key = 'user';
    }
    else {
        key = 'admin';
    }
    // console.log(listMess);
    var message = listMess.slice().reverse().find((item) => {
        if (item[key]) {
            return item
        }
    });
    if (message.isRead === 0) {
        return true
    }
    return false;
}
function showbox(RoomID, checkNoRead, element) {
    if (checkNoRead) {
        updateReadChat(RoomID, 'user', element);
    }
    $('.chatbox').css('display', 'block');
    socket.emit('joinRoom', RoomID);
    loadChatBox_admin(RoomID);
    $('#roomIDAdmin').val(RoomID);
    $(".chatbox").addClass('showbox');
}
function loadChatBox_admin(RoomID) {
    $.ajax({
        url: '/chatbox/load-chatbox',
        data: { RoomID: RoomID },
        dataType: 'json',
        type: 'GET',
        success: function (obj) {
            let list = obj.list;
            let result_list = appendChatFile_Mess(list);
            $('#nameUser').text('KH ' + RoomID.slice(0, 6));
            $('#createDate').text(formatDate(new Date(obj.createDate)));
            $('.msg-body').html('<ul>' + result_list + '</ul>');
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
                sendChat_admin(message, '', RoomID, true);
            }
            else {
                sendChat_admin(message, RoomID, 0, true)
            }
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function sendChat_admin(message, err, room, isMess) {
    let htmlSendChat = '';
    if (isMess) {
        htmlSendChat += '<li class="repaly">' +
            '<p> ' + message + ' </p>' +
            '<span class="time">' + formatDate(new Date()) + '</span>';
        '</li>';
    }
    else {
        for (let i = 0; i < message.length; i++) {
            htmlSendChat += '<li class="repaly files-li">' +
                '<img class="files-chatbox" src="' + message[i] + '">' +
                '<span class="time">' + formatDate(new Date()) + '</span>';
            '</li>';
        }
    }
    $('.msg-body ul').append(htmlSendChat);
    if (room != 0) {
        socket.emit('admin-chat-message', message, room, isMess);
    }
}
function appendChatFile_Mess(list) {
    let htmlSendChat = '';
    list.forEach((val) => {
        if (val.files) {
            if (val.user) {
                for (let i = 0; i < val.user.length; i++) {
                    htmlSendChat += '<li class="sender files-li">' +
                        '<img class="files-chatbox" src="' + val.user[i] + '">' +
                        '<span class="time">' + formatDate(new Date(val.date)) + '</span>' +
                        '</li>';
                }
            }
            else {
                for (let i = 0; i < val.admin.length; i++) {
                    htmlSendChat += '<li class="repaly files-li">' +
                        '<img class="files-chatbox" src="' + val.admin[i] + '">' +
                        '<span class="time">' + formatDate(new Date(val.date)) + '</span>';
                    '</li>';
                }
            }
        }
        else {
            if (val.user) {
                htmlSendChat += '<li class="sender">' +
                    '<p> ' + val.user + ' </p>' +
                    '<span class="time">' + formatDate(new Date(val.date)) + '</span>';
                '</li>';
            }
            else {
                htmlSendChat += '<li class="repaly">' +
                    '<p> ' + val.admin + ' </p>' +
                    '<span class="time">' + formatDate(new Date(val.date)) + '</span>';
                '</li>';
            }
        }
    });
    return htmlSendChat;
}

function updateReadChat(roomID, type, element) {
    $.ajax({
        url: '/chatbox/update-readchat',
        data: { type: type, roomID: roomID },
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            let status = obj.status;
            if (status == 1) {
                setReaded(element);
            }
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
function setReaded(element) {
    let fontBolds = element.querySelectorAll('.font-weight-bold');
    fontBolds.forEach(bold => {
        bold.classList.remove('font-weight-bold');
    });
}