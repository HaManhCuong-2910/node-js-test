const {con, sql} = require('../model/connect');
class sanphamModel{
    async getSanPhamDanhMuc(result){
        let pool = await con;
        let sqlString  = " select top 1 * from DanhMuc";
        let sqlString2  = " select * from SanPham";
        return pool.request()
        .query(sqlString, function(err, danhmuc_re){
            pool.request()
            .query(sqlString2,(err1, sanpham_re)=>{            
                result(err1,danhmuc_re.recordset,sanpham_re.recordset);
            })
        })
    }
}
module.exports = new sanphamModel