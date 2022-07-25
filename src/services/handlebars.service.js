class handlebarsService{

    //connection socket
    registers( hbsrgs ){
        hbsrgs.registerHelper('switch', function(value, options) {
            this.switch_value = value;
            return options.fn(this);
        });
        
        hbsrgs.registerHelper('case', function(value, options) {
        if (value == this.switch_value) {
            return options.fn(this);
        }
        });
        
        hbsrgs.registerHelper('default', function(value, options) {
        if (this.switch_break == false) {
            return value;
        }
        });
    }
}

module.exports = new handlebarsService;