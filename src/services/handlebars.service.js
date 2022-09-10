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
    }
}

module.exports = new handlebarsService;