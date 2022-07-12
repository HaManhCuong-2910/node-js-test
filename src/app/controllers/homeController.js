const common = require('../common/common');
const product = require('../../model/product');
require('dotenv').config();

class homeController{
  //get all data
    async index(req, res) {
        try{
          await product.find({},(error, results)=>{
            console.log("products: " + results);
          })
          res.render('home', {
            showFooter: false,
            layout: 'layoutDefaut.hbs'
          });
        }
        catch(error){
          console.log(error);
        }
        
    }
    //upload imgs
    async upload(req, res) {
      try{
        console.log(req.files);
        console.log(req.body);
        res.render('home', {
          showFooter: false,
          layout: 'layoutDefaut.hbs'
        });
      }
      catch(error){
        console.log(error);
      }
      
  }
}
module.exports = new homeController