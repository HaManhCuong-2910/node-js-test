const homeRouter = require('./home');
const testmailRouter = require('./testmail');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const chatboxRouter = require('./chatbox');
const fncCommon = require('../app/common/common');
function routes(app){
    app.use('/admin',adminRouter);
    app.use('/testmail',testmailRouter);
    app.use('/chatbox',chatboxRouter);
    app.use('/auth',authRouter);
    app.use('/',homeRouter);
    app.get('*', function(req, res) {
        res.redirect('/');
    });
}
module.exports = routes;