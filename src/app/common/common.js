class commonFunction {
    getBol(bolInput) {
        if (bolInput == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    async UpdateProductID(idProc, product) {
        let productDone = await product.findOneAndUpdate({ _id: idProc }, { ProductID: 'VN' + idProc }, { new: true, upsert: true });
        return productDone
    }
    async breadcrumbsPath(category, pCat) {
        let text = "";
        let i = 0;
        while (pCat != 0) {
            i++;
            await category.findOne({ _id: pCat }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.id == pCat) {
                        pCat = result.partent;
                        if (i === 1) {
                            text = result.Name;
                        }
                        else {
                            text = result.Name + text;
                        }
                    }
                }
            })
        };
        return text;
    }

    //valid auth
    requiredAuth(req, res, next) {
        let userID = req.session.userID;
        if (!userID) {
            return res.render('admin/authencation/login', { layout: false });
        }
        next();
    }

    requireAuth_User(req,res,next){
        console.log(req.session);
        next();
    }

    //chuyen doi url
    stringToSlug(str) {
        // remove accents
        let from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
            to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(RegExp(from[i], "gi"), to[i]);
        }

        str = str.toLowerCase()
            .trim()
            .replace(/[^a-z0-9\-]/g, '-')
            .replace(/-+/g, '-');

        return str;
    }

    //dem nguoc time
    timeSince(VarDate) {
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
}
module.exports = new commonFunction;