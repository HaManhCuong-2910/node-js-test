const common = require('../common/common');
const product = require('../../model/product');
require('dotenv').config();

class homeController{
  //get all data
    async index(req, res) {
        try{
          await product.find({},((error,result)=>{
            if (error) throw error;
            console.log(result);
          }));
          req.session.user_id = "id1";
          let msg = "Chào from controller";
          _io.emit("send-chat-message", msg); 
          res.render('home', {
            showFooter: true,
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