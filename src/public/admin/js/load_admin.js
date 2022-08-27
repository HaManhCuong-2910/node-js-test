$(function() {
    $.ajax({
        url: '/infor/admin',
        data: {},
        dataType: 'json',
        type: 'GET',
        success: function (obj) {
            let name = obj.Infor.Name;
            $('#info-admin a').text(name);
        },
        error: function (obj) {
            console.log(obj);
        }
    })
});