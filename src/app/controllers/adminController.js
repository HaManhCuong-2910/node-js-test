const common = require('../common/common');
const category = require('../../model/category');
const md5 = require('md5');
require('dotenv').config();

class adminController{

    async index(req, res) {
        try{
            let nav = await common.breadcrumbsPath(category,3).then(function(data){
                return data;
            });
            console.log(nav);
            res.render('admin/doashboard', {
                showFooter: true,
                layout: 'admin/layoutAdmin.hbs'
            });
        }
        catch(error){
            console.log(error);
        }
    }
    async login(req, res) {
        try{
            let account = { id: '123', provider: 'local' };
            req.session.account = account;
            res.render('admin/authencation/login',{layout: false});
        }
        catch(error){
            console.log(error);
        }
    }
}
module.exports = new adminController