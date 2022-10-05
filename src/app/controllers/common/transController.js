const translate = require('translate-google');
require('dotenv').config();

class testSendMailController {

  async index(req, res) {
    let value = req.body.value;
    let result;
    

    await translate(value, {from: 'vi', to: 'en'}).then(res => {
      result = res;
    }).catch(err => {
        console.error(err)
    })

    res.json({
      result
    })
  }
  async changeLang(req,res){
    let status = 1 
    let lang = req.query.lang;
    await res.cookie('lang', lang, { maxAge: 900000 })
    res.json({
      status
    })
  }
}
module.exports = new testSendMailController