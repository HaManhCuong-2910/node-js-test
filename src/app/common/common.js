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
    async breadcrumbsPath(category,pCat){
        let text = "";
        let i = 0;
        while(pCat != 0){ 
            i++;
            await category.findOne({_id: pCat},(err,result)=>{
                if (err){
                    console.log(err);
                }
                else{
                    if(result.id == pCat){
                        pCat = result.partent;
                        if(i === 1){
                            text =  result.Name;
                        }
                        else{
                            text = result.Name + text;
                        }
                    }
                }                
            })
        };
        return text;
    }
    requiredAuth(req,res,next){
        let userID = req.session.userID;
        if(!userID){
            return res.render('admin/authencation/login',{layout: false});
        }
        next();
    }
    stringToSlug(str) {
        // remove accents
        let from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
            to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
        for (let i=0, l=from.length ; i < l ; i++) {
          str = str.replace(RegExp(from[i], "gi"), to[i]);
        }
      
        str = str.toLowerCase()
              .trim()
              .replace(/[^a-z0-9\-]/g, '-')
              .replace(/-+/g, '-');
      
        return str;
      }
}
module.exports = new commonFunction;