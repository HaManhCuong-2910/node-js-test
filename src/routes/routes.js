const homeRouter = require('./home');
const testmailRouter = require('./testmail');
const adminRouter = require('./admin');
function routes(app){
    app.use('/admin',adminRouter);
    app.use('/testmail',testmailRouter);
    app.use('/',homeRouter);
}
module.exports = routes;