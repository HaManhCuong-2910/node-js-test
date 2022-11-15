const i18n = require("i18n");
const common = require('../app/common/common');
const adminRegister = require('./adminService/admin.handlebarsService');
class handlebarsService {

    //connection hbs
    registers(hbsrgs) {
        //đăng ký hbs helper admin
        adminRegister(hbsrgs);

        hbsrgs.registerHelper('switch', function (value, options) {
            this.switch_value = value;
            return options.fn(this);
        });

        hbsrgs.registerHelper('activeClass', function (type,options) {
            let slug = this.slug;
            if(slug == type){
                return 'active';
            }
            else if(!type && slug == 'booking'){
                return 'active';
            }
            return '';
        });
        
        hbsrgs.registerHelper('i18n', function () {
            return i18n.__.apply(this,arguments);
        });

        hbsrgs.registerHelper('__n', function () {
            return i18n.__n.apply(this, arguments);
        });

        
        hbsrgs.registerHelper("indexPage", function(index, page, pageSize, options) {
            let numericalOrder = ((page * pageSize) - pageSize) + index + 1;                
            return numericalOrder
        });

        hbsrgs.registerHelper("formatDate", function(Date) {
            let yyyy = Date.getFullYear();
            let mm = Date.getMonth() + 1; // Months start at 0!
            let dd = Date.getDate();

            let hours = Date.getHours();
            let minutes = Date.getMinutes();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            let formatteddateVal = dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes;
            return formatteddateVal;
        });

        hbsrgs.registerHelper('case', function (value, options) {
            if (value == this.switch_value) {
                return options.fn(this);
            }
        });

        hbsrgs.registerHelper('ifEquals', function (arg1, arg2, options) {
            console.log('test git');
            if (arg1 == arg2) {
                return options.fn(this)
            } else {
                return options.inverse(this);
            }
        });

        hbsrgs.registerHelper('default', function (value, options) {
            if (this.switch_break == false) {
                return value;
            }
        });

        hbsrgs.registerHelper('pagination', function (pages,current,url) {
            let html = '';
            let i = Number(current) > 3 ? Number(current) - 2 : 1;
            if(pages > 0) {
                html += '<div class="pagination">';
                if(current > 1) {
                    html += `<a href="`+url+`?page=`+(Number(current) - 1)+`" class="btn-page">
                                <i class="fa fa-arrow-left btn-page--icon"></i>
                            </a>`;
                }
                if(i !== 1){
                    html += '<a class="page">...</a>';
                }
                for(; i <= (Number(current) + 2) && i <= pages; i++) {
                    if(i == current) {
                        html += '<a href="'+url+'?page='+i+'" class="page page-active">' + i + '</a>';
                    }
                    else{
                        html += '<a href="'+url+'?page='+i+'" class="page">' + i + '</a>'; 
                    }
                    if (i == Number(current) + 2 && i < pages) {
                        html += '<a class="page">...</a>';
                    }
                }
                if(current < pages) {
                    html += `<a href="`+url+`?page=`+(Number(current) + 1)+`" class="btn-page">
                                <i class="fa fa-arrow-right btn-page--icon"></i>
                            </a>`;
                }
                html += '</div>';
            }
            return new hbsrgs.SafeString(html);
        });
    }
}

module.exports = new handlebarsService;