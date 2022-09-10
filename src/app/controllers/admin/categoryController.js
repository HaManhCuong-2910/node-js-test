const common = require('../../common/common');
const category = require('../../../model/category');
const md5 = require('md5');
require('dotenv').config();

class categoryController {

    async index(req, res) {
        let categories = await category.find({}).lean();
        res.render('admin/m_cartegory/cartegory', {
            isMenu: 'adminCat',
            catslug: 'm_cat',
            categories: categories,
            layout: 'admin/layoutAdmin.hbs'
        });
    }
    detailCat(req, res) {
        let id = req.params.id;
        let result = {
            resId: id
        }
        res.render('admin/m_cartegory/detail_cat', {
            isMenu: 'adminCat',
            catslug: 'm_cat',
            result: result,
            layout: 'admin/layoutAdmin.hbs'
        });
    }
}
module.exports = new categoryController