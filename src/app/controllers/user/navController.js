const category = require('../../../model/category');
require('dotenv').config();

class navController {

  async index(req, res) {
    let type = req.params.type;
    let lang = req.cookies.lang || 'vi';
    let cates = await category.aggregate(
      [
          { 
            "$project": {
              "slug": 1,
              "NameCate": lang == 'vi'?"$Name" :"$English",
              "partent": 1,
              "CreationDate": 1,
              "LastEditDate": 1
          }
        }
      ]
    );
    res.render('client/navigation', {
        type,
        cates,
        layout: 'layoutDefaut.hbs'
    });

  }
}
module.exports = new navController