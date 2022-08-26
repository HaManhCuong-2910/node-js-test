const common = require('../app/common/common');
const account = require('../model/account');
class handlebarsService {

    //connection socket
    registers(hbsrgs) {
        hbsrgs.registerHelper('switch', function (value, options) {
            this.switch_value = value;
            return options.fn(this);
        });

        hbsrgs.registerHelper('case', function (value, options) {
            if (value == this.switch_value) {
                return options.fn(this);
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
        hbsrgs.registerHelper('inforAdmin',async function(adminID,options){
            let findAdmin = await account.find({$and: [{_id : adminID}, {typeAcc: 1}]});
            return findAdmin
        })
    }
}

module.exports = new handlebarsService;