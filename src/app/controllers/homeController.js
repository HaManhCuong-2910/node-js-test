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
              res.send({result: data.recordset});
            }
          })
          
          // res.render('admin/doashboard', {
          //   showFooter: true,
          //   layout: 'admin/layoutAdmin.hbs',
          //   sanpham: products
          // });
           
        }
        catch(err){
          console.log(err);
        }
    }
}
module.exports = new homeController