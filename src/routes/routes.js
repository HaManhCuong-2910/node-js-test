const homeRouter = require('./home');
const testmailRouter = require('./testmail');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const fncCommon = require('../app/common/common');
function routes(app){
    app.use('/admin',adminRouter);
    app.use('/testmail',testmailRouter);
    app.use('/auth',authRouter);
    app.use('/',homeRouter);
}
module.exports = routes;