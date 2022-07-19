const con = require('../../model/connect');
const sendMail = require('../Email/sendMail');
require('dotenv').config();

class testSendMailController{

    async index(req, res) {
      try{
        res.render('admin/doashboard', {
          showFooter: true,
          layout: 'admin/layoutAdmin.hbs'
        });
      }
      catch(error){
        console.log(error);
      }
      
  }
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
module.exports = new testSendMailController