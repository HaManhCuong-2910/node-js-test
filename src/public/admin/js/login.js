$( "#frm_Login" ).submit(function( event ) {
    event.preventDefault();
    $('#btn-login').addClass('btn-login-active');
    $('#btn-login').attr('type','button');
    $.ajax({
        url: '/admin/login',
        data: $(this).serialize(),
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            let status = obj.status;
            let message = obj.message;
            if(status == 1){
                location.reload();
            }
            else{
                $('#btn-login').removeClass('btn-login-active');
                $('#btn-login').attr('type','submit');
                swal({
                    title: "Thông báo!",
                    text: message,
                    icon: "error"
                });
            }
        },
        error: function (obj) {
            console.log(obj);
        }
    })
});

