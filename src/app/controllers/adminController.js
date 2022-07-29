const common = require('../common/common');
const md5 = require('md5');
require('dotenv').config();

class adminController{

    async index(req, res) {
        try{
            let navvigation = common.breadcrumbsPath(3);
            console.log(navvigation);
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
            res.render('admin/authencation/login',{layout: false});
        }
        catch(error){
            console.log(error);
        }
    }
}
module.exports = new adminController