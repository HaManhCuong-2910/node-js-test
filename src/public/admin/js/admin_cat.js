function updateCat(element,catID){
    let partentValue = element.parentElement.parentElement.querySelector('select[name="partents"]').value;
    $('.loading-it').css('display','block');
    $.ajax({
        url: '/admin/quan-ly-danh-muc/update',
        data: {partent: partentValue, ID: catID },
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            setTimeout(()=>{
                $('.loading-it').css('display','none');
                returnNotify(obj);
            },500);            
        },
        error: function (obj) {
            console.log(obj);
        }
    })
};
$('#btn-open-frmAdd').click(function(){
    $('#frmCateAdd').toggleClass('open-form-cateAdd');
});
$('#frmCateAdd').submit(function(event){
    event.preventDefault();
    let validMessages = {
        nameCate: 'Chưa nhập tên danh mục'
    }
    let keysValid = Object.keys(validMessages);
    for(let i=0;i<keysValid.length; i++){
        if(validate.isEmpty($('input[name="'+keysValid[i]+'"]',this).val())){
            return swal({
                title: "Thông báo!",
                text: validMessages[''+keysValid[i]+''],
                icon: "warning"
            });
        }
    } 
    return addCate($(this).serialize());   
})
function addCate(dataForm){
    $('.loading-it').css('display','block');
    $.ajax({
        url: '/admin/quan-ly-danh-muc/add',
        data: dataForm,
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            setTimeout(()=>{
                $('.loading-it').css('display','none');
                returnNotify(obj);
            },500);            
        },
        error: function (obj) {
            console.log(obj);
        }
    })
}
$('.open-mdDelCate').click(function(){
    $('input[name="cateIDdel"]').val($(this).attr('data-id'));
})
$('#btn-DelCate').click(function(){
    $('.loading-it').css('display','block');
    $.ajax({
        url: '/admin/quan-ly-danh-muc/delete',
        data: {cateID: $('input[name="cateIDdel"]').val()},
        dataType: 'json',
        type: 'POST',
        success: function (obj) {
            setTimeout(()=>{
                $('.loading-it').css('display','none');
                returnNotify(obj);
            },500);            
        },
        error: function (obj) {
            console.log(obj);
        }
    })
})
function returnNotify(obj){
    let status = obj.status;
    let message = obj.message;
    if(status == 1){
        swal({
            title: "Thông báo!",
            text: message,
            icon: "success"
        })
        .then((response)=>{
            if(response){
                location.reload();
            }
        });
    }
}