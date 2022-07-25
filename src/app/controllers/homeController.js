const common = require('../common/common');
const product = require('../../model/product');
const md5 = require('md5');
require('dotenv').config();

class homeController{
  //get all data
    async index(req, res) {
        try{
          // const proc = new product({ Title: 'Tạo vé máy bay' });
          // await proc.save(function (err,result) {
          //   if (err) throw err;
          //   common.UpdateProductID(result._id,product).then(function(data){
          //     console.log(data);
          //   })
          // });
          await product.find({}, ((error, result) => {
            if (error) throw error;
            console.log(result);
          }));
          let jsontesting = [{"id": 1, "name" : "Cường"},{"id": 2, "name": "Hưng"}];
          req.session.jsontesting = jsontesting;
          let msg = "Chào from controller";
          _io.emit("send-chat-message", msg); 
          res.render('home', {
            testSwtich: 'a',
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