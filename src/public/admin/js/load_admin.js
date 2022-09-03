$(function () {
    $.when(getInfor()).then(function (dataInfor) {

        //inner data infor
        let name = dataInfor.Infor.Name;
        $('#info-admin a').text(name);

    });
});
function getInfor() {
    return $.ajax({
        url: '/infor/admin',
        data: {},
        dataType: 'json',
        type: 'GET'
    })
}