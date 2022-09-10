function adminRegister(hbsrgs){
    hbsrgs.registerHelper("math", function(lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
            
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    });
    hbsrgs.registerHelper("partentsCat", function(id,partent,categories) {
        let result = '<option value="0"  >Không phụ thuộc</option>';
        let selected;

        categories.map((cate)=>{
            selected = cate._id == partent? 'selected': '';
            return cate._id != id ? result += '<option value="'+cate._id+'" '+selected+' > '+cate.Name+'</option>' : '';
        })
        return new hbsrgs.SafeString(result);
    });
}

module.exports = adminRegister;