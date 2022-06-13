const con = require('../../model/connect')
require('dotenv').config();

class homeController{
  //get all data
    async index(req, res) {
        try{
          let pool = await con;
          let sqlString  = " select top 1 * from SanPham";
          return await pool.request().query(sqlString,(err,data)=>{
            if(err){
              console.log(err);
            }
            else{
              // res.send({result: data.recordset,update: 1});
              res.render('home', {
                showFooter: true,
                layout: 'layoutDefaut.hbs',
                sanpham: data.recordset
              });
            }
          }) 
        }
        catch(err){
          console.log(err);
        }
    }
}
module.exports = new homeController