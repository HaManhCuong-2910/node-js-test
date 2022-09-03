module.exports = {
    async manageCart(req, res, bounus) {
        try {
            res.render('admin/m_cartegory/cartegory', {
                isMenu: 'adminCart',
                bounus: bounus,
                layout: 'admin/layoutAdmin.hbs'
            });
        }
        catch (error) {
            console.log(error);
        }
    },
    async adminHelper(req, res, bounus) {
        try {
            res.render('admin/helper/helperView', {
                isMenu: 'adminHelper',
                bounus: bounus,
                layout: 'admin/layoutAdmin.hbs'
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}