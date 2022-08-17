const common = require('../common/common');
const md5 = require('md5');
require('dotenv').config();

class adminController {

    async logout(req, res) {
        try {
            res.redirect('/');
        }
        catch (error) {
            console.log(error);
        }
    }
    async profile(req, res) {
        try {
            console.log(req.session);
            res.send("you are authenticated");
        }
        catch (error) {
            console.log(error);
        }
    }
    async loginUser(req,res){
        try{
            res.redirect('/auth/profile');
        }
        catch (err){
            console.log(err);
        }
    }
    async setUserName(req,res){
        try{
            return res.json({
                status: 1,
                message: res.body.userID
            })
        }
        catch (err){
            console.log(err);
        }
    }
}
module.exports = new adminController