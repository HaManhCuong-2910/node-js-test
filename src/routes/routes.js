const homeRouter = require('./home');
const testmailRouter = require('./testmail');
const adminRouter = require('./admin');
const fncCommon = require('../app/common/common');
function routes(app){
    app.use('/admin',fncCommon.requiredAuth,adminRouter);
    app.use('/testmail',testmailRouter);
    app.use('/',homeRouter);
    app.get('*',function(req,res){
        res.redirect('/');
    })
}
module.exports = routes;