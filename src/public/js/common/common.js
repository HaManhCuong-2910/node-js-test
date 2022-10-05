//dem nguoc time
function timeSince(VarDate) {
    let date = new Date(VarDate);
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " năm";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " tháng";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " ngày";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " giờ";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " phút";
    }
    return Math.floor(seconds) + " giây";
}

function formatDate(dateVal){
    let yyyy = dateVal.getFullYear();
    let mm = dateVal.getMonth() + 1; // Months start at 0!
    let dd = dateVal.getDate();

    let hours = dateVal.getHours();
    let minutes = dateVal.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formatteddateVal = dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes;
    return formatteddateVal;
}
const debounce = (fn, delay)=>{
    delay = delay || 0;
    let timer;
    return ()=>{
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(()=>{
            fn();
        },delay);
    }
}
$(function() {

    $('.lang-items').click(function (){
        let lang = $(this).attr('data-val');
        $.ajax({
            url: '/translate/change',
            data: { lang },
            dataType: 'json',
            type: 'GET',
            success: function (obj) {
                let {status} = obj;
                if(status == 1){
                    location.reload(1);
                }
            },
            error: function (obj) {
                console.log(obj);
            }
        })
    })

});
