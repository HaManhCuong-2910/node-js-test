const homeRouter = require('./user-route/home');
const testmailRouter = require('./common-route/testmail');
const authRouter = require('./user-route/auth');
const adminRouter = require('./admin-route/admin');
const chatboxRouter = require('./common-route/chatbox');
const inforRouter = require('./common-route/infor');
function routes(app){
    app.use('/admin',adminRouter);
    app.use('/testmail',testmailRouter);
    app.use('/chatbox',chatboxRouter);
    app.use('/auth',authRouter);
    app.use('/infor',inforRouter);
    app.use('/',homeRouter);
    app.get('*', function(req, res) {
        res.send('404 URL NOT FOUND');
    });
}
module.exports = routes;