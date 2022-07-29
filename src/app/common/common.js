class commonFunction{
    getBol(bolInput){
        if(bolInput == 1){
            return true;
        }
        else{
            return false;
        }
    }
    async UpdateProductID(idProc,product){
        let productDone = await product.findOneAndUpdate({ _id: idProc }, { ProductID: 'VN' + idProc }, { new: true, upsert: true });
        return productDone
    }
    breadcrumbsPath(pCat){
        let listNode = [{"id": 1,"Name":"Trang chủ", "partent": 0},{"id": 2,"Name":"All collect", "partent": 1},{"id": 3,"Name":"Mua bán", "partent": 2}];
        let text = "";
        let i = 0;
        while(pCat != 0){ 
            i++;
            listNode.findIndex((a)=>{
                if(a.id == pCat){
                    pCat = a.partent;
                    if(i === 1){
                        text =  a.Name;
                    }
                    else{
                        text = a.Name + text;
                    }
                }
            });
        };
        return text;
    }
    requiredAuth(req,res,next){
        let userID = req.session.userID;
        if(!userID){
            res.redirect('/admin/login');
            return;
        }
        next();
    }
}
module.exports = new commonFunction;