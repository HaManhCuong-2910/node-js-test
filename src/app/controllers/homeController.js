const {con, sql} = require('../../model/connect');
const sanphamModel = require('../../model/sanpham.model');

class homeController{
  //get all data
    index(req, res) {
      sanphamModel.getSanPhamDanhMuc((err,danhmuc,sanpham)=>{
        res.send({sanpham:sanpham,danhmuc: danhmuc });
        // res.render('home', {
        //   showFooter: true,
        //   showHeader: false,
        //   layout: 'layoutDefaut.hbs',
        //   danhmuc: danhmuc,
        //   sanpham: sanpham
        // });
      })
    }
}
module.exports = new homeController