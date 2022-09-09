module.exports = {
    async manageCart(req, res, catslug) {
        res.render('admin/m_cartegory/cartegory', {
            isMenu: 'adminCart',
            catslug: catslug,
            layout: 'admin/layoutAdmin.hbs'
        });
    },
    async adminHelper(req, res, catslug) {
        res.render('admin/helper/helperView', {
            isMenu: 'adminHelper',
            catslug: catslug,
            layout: 'admin/layoutAdmin.hbs'
        });
    }
}