const con = require('../../model/connect');
const sendMail = require('../Email/sendMail');
require('dotenv').config();

class homeController{
    //sendTestMail
    async sendTestMail(req, res) {
      try{
        console.log(req.body.textTest);
        let content = '';
        content += `
            <div style="padding: 10px; background-color: #003375">
                <div style="padding: 10px; background-color: white;">
                    <h4 style="color: #0085ff">Gửi mail với nodemailer và express2</h4>
                    <span style="color: black">Đây là mail test</span>
                </div>
            </div>`;
        try{
            sendMail('hamanhcuong.gaapnow@gmail.com','Test Nodemailer',content);
            res.json({status: "Ok!!"});
        }
        catch{
            res.json({status: "fail"});
        }
      }
      catch(err){
        console.log(err);
      }
  }
}
module.exports = new homeController