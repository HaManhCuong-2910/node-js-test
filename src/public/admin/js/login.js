$( "#frm_Login" ).submit(function( event ) {
    event.preventDefault();
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
                console.log(message);
            }
        },
        error: function (obj) {
            console.log(obj);
        }
    })
});

