const common = require('../../common/common');
const category = require('../../../model/category');
const md5 = require('md5');
require('dotenv').config();

class categoryController {

    async index(req, res) {
        let perPage = 1; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.query.page || 1; 

        let categories = await category.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .lean();
        let allCate = await category.find({},'Name partent');
        let countPage = allCate.length;
        let pages = Math.ceil(Number(countPage)/perPage);
        res.render('admin/m_cartegory/cartegory', {
            categories,
            allCate,
            countPage,
            pages,
            perPage,
            current: page,
            isMenu: 'adminCat',
            catslug: 'm_cat',
            layout: 'admin/layoutAdmin.hbs'
        });
    }
    async handUpdateCat(req,res){
        let partentU = req.body.partent;
        let catID = req.body.ID;

        await category.findOneAndUpdate({_id: catID},{partent: partentU});
        res.json({
            status: 1,
            message: 'Cập nhật thành công'
        })
    }
    async handAddCate(req,res){
        let nameCate = req.body.nameCate;
        let slugName = common.stringToSlug(nameCate);
        let slcPartent = req.body.slcPartent;
        let status = 1,message = 'Thêm thành công';

        await category.create({Name: nameCate,partent: slcPartent,slug: slugName},function(error){
            if(error){
                status = 0;
                message = 'Thêm thất bại';
            }
        });
        res.json({
            status: status,
            message: message
        })
    }
    async handDeleteCate(req,res){
        let cateID = req.body.cateID;
        let status = 1,message = 'Xóa thành công';

        await category.deleteOne({_id: cateID},async function(error,result){
            if(error){
                status = 0;
                message = 'Xóa thất bại';
            }
            else{
                await category.updateMany({partent: cateID},{partent: 0},function(err){
                    if(err){
                        status = 0;
                        message = 'Xóa thất bại';
                    }
                });
            }
        })

        res.json({
            status: status,
            message: message
        })
    }
}
module.exports = new categoryController