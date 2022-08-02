const common = require('../common/common');
const product = require('../../model/product');
const md5 = require('md5');
const account = require('../../model/account');
require('dotenv').config();

class homeController {
  //get all data
  async index(req, res) {
    try {
      // const proc = new product({ Title: 'Tạo vé máy bay' });
      // await proc.save(function (err,result) {
      //   if (err) throw err;
      //   common.UpdateProductID(result._id,product).then(function(data){
      //     console.log(data);
      //   })
      // });

      let procs = await product.find({ $and: [{ "_id": { $lt: 3 } }, { "_id": { $gt: 1 } }] }, ((error, result) => {
        if (error) throw error;
        return result;
      })).lean();

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
      let userID = "cuonghm";
      req.session.userID = userID;
      let msg = "Chào from controller";
      _io.emit("send-chat-message", msg);
      res.render('home', {
        testSwtich: 'a',
        showFooter: true,
        layout: 'layoutDefaut.hbs',
        products: procs
      });
    }
    catch (error) {
      console.log(error);
    }

  }
  async detail(req,res){
    res.send(req.params.id);
  }
  //upload imgs
  async upload(req, res) {
    try {
      console.log(req.files);
      console.log(req.body);
      res.render('home', {
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