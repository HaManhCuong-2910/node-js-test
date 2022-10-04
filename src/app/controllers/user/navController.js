require('dotenv').config();

class navController {

  async index(req, res) {
    let type = req.params.type;
    res.render('client/navigation', {
        layout: 'layoutDefaut.hbs'
    });

  }
}
module.exports = new navController