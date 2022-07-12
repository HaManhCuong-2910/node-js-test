const homeRouter = require('./home');
const testmailRouter = require('./testmail');
function routes(app){
    app.use('/testmail',testmailRouter);
    app.use('/',homeRouter);
}
module.exports = routes;