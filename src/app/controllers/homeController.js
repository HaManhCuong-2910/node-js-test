const common = require('../common/common');
const product = require('../../model/product');
const md5 = require('md5');
const account = require('../../model/account');
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

          // product.find({}, ((error, result) => {
          //   if (error) throw error;
          //   console.log(result);
          // }));


          // let acc = new account(
          //   {
          //     Email: 'cuonghamanhcuong34@gmail.com',
          //     Name: 'Cường kum',
          //     Mobile: '0336272203',
          //     Password: 'fd460dbc6f0f9df3b29c549d5a51f302',
          //   }
          // )

          // await acc.save(function (err,result){
          //   if (err) throw err;
          //   console.log(result);        
          // })
          let strtestt = "Mua nhà ở quận Hà Đông, Hà nội";
          console.log(common.stringToSlug(strtestt));
          let userID = "cuonghm";
          req.session.userID = userID;
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