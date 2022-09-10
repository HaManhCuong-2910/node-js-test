const common = require('../../common/common');
const md5 = require('md5');
require('dotenv').config();

class helperController {

    index(req, res) {
        res.render('admin/helper/helperView', {
            isMenu: 'adminHelper',
            catslug: 'ad_help',
            layout: 'admin/layoutAdmin.hbs'
        });
    }
}
module.exports = new helperController