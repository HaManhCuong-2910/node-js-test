const common = require('../../common/common');
const account = require('../../../model/account');
const md5 = require('md5');
require('dotenv').config();

class adminController {

    index(req, res) {
        res.render('admin/doashboard', {
            layout: 'admin/layoutAdmin.hbs'
        });
    }
    async login(req, res) {
        try {
            let adminID = req.session.adminID;
            if (adminID) {
                return res.redirect('/admin');
            }

            return res.render('admin/authencation/login', { layout: false });
        }
        catch (error) {
            console.log(error);
        }
    }
    async handLogin(req, res) {
        try {
            let mobile = req.body.mobile;
            let password = req.body.password;
            let findAcc = await account.find({ $and: [{ "Mobile": mobile }, { typeAcc: 1 }] }, (err, result) => {
                if (err) throw err;
                return result;
            })
            if (findAcc.length > 0) {
                if (md5(password) === findAcc[0].Password) {
                    req.session.adminID = findAcc[0]._id;
                    return res.json({
                        status: 1,
                        message: "Đăng nhập thành công"
                    });
                }
                else {
                    return res.json({
                        status: 0,
                        message: "Mật khẩu không chính xác"
                    });
                }
            }
            else {
                return res.json({
                    status: 0,
                    message: "Tài khoản không tồn tại"
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = new adminController