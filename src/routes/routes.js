const homeRouter = require('./home');
const testmailRouter = require('./testmail');
function routes(app){
    app.use('/',homeRouter);
    app.use('/testmail',testmailRouter);
}
module.exports = routes;