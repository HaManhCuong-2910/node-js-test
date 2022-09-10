const common = require('../app/common/common');
const account = require('../model/account');
class handlebarsService {

    //connection socket
    registers(hbsrgs) {
        hbsrgs.registerHelper('switch', function (value, options) {
            this.switch_value = value;
            return options.fn(this);
        });

        hbsrgs.registerHelper("math", function(lvalue, operator, rvalue, options) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
                
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
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

        hbsrgs.registerHelper('timeSince', function (VarDate, options) {
            let date = new Date(VarDate);
            let seconds = Math.floor((new Date() - date) / 1000);

            let interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " năm";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " tháng";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " ngày";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " giờ";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " phút";
            }
            return Math.floor(seconds) + " giây";
        });
    }
}

module.exports = new handlebarsService;