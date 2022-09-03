const common = require('../common/common');
const product = require('../../model/product');
const md5 = require('md5');
require('dotenv').config();

class homeController {
  //get all data
  async index(req, res) {
    try {
      let procs = await product.find({ $and: [{ "_id": { $lt: 3 } }, { "_id": { $gt: 1 } }] }, ((error, result) => {
        if (error) throw error;
        return result;
      })).lean();

      res.render('client/home', {
        showFooter: true,
        layout: 'layoutDefaut.hbs',
        products: procs
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