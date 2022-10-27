const common = require('../../common/common');
const category = require('../../../model/category');
const md5 = require('md5');
require('dotenv').config();

class homeController {
  //get all data
  async index(req, res) {
    try {
      let lang = req.cookies.lang || 'vi';
      let title = 'Ứng dụng du lịch và Lữ Hành';
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
    
      res.render('client/home', {
        cates,
        title,
        layout: 'layoutDefaut.hbs'
      });
    }
    catch (error) {
      console.log(error);
    }

  }
  async detail(req, res) {
    res.send(req.params.id);
  }
  async flightSearch(req, res) {
    return res.render('client/flightsearch', {
      layout: 'layoutDefaut.hbs'
    })
  }
  //upload imgs
  async upload(req, res) {
    try {
      console.log(req.files);
      console.log(req.body);
      res.render('client/home', {
        showFooter: false,
        layout: 'layoutDefaut.hbs'
      });
    }
    catch (error) {
      console.log(error);
    }

  }
}
module.exports = new homeController