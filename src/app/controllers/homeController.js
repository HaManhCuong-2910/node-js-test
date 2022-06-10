const sql = require('mssql');
require('dotenv').config();

class homeController{
  //get all data
    async index(req, res) {
        try{
          let pool = await sql.connect(process.env.DATABASE_URL);
          let sqlString  = " select top 1 * from DanhMuc";
          let sqlDanhMucnhieu  = " select * from DanhMuc";
          let products = await (await pool.request().query(sqlString)).recordset;
          let DanhMucnhieu = await (await pool.request().query(sqlDanhMucnhieu)).recordset;
          res.send({result: products,DanhMuc: DanhMucnhieu});
          // res.render('home', {
          //   showFooter: true,
          //   showHeader: false,
          //   layout: 'layoutDefaut.hbs',
          //   sanpham: products
          // }); 
        }
        catch(err){
          console.log(err);
        }
    }
}
module.exports = new homeController