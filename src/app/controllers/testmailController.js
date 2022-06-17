const con = require('../../model/connect');
const sendMail = require('../Email/sendMail');
require('dotenv').config();

class homeController{
    //sendTestMail
    async sendTestMail(req, res) {
      try{
        console.log(req.body.textTest);
      }
      catch(err){
        console.log(err);
      }
  }
}
module.exports = new homeController