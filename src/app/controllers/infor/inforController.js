const common = require('../../common/common');
const category = require('../../../model/category');
const account = require('../../../model/account');
const md5 = require('md5');
require('dotenv').config();

class adminSupportController{

    async getInfor(req,res){
        let type = req.params.type;
        let resultInfor;
        if(type == 'admin'){
            resultInfor = await account.findOne({$and: [{_id : req.session.adminID}, {typeAcc: 1}]}).lean();
        }
        
        return res.json({
            Infor: resultInfor
        })
    }
    async getNav(req,res){
        var nav = await common.breadcrumbsPath(category,3).then(function(data){
            return data;
        });
        return res.json({
            navigator: nav
        })
    }
}
module.exports = new adminSupportController