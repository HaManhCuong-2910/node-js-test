const homeRouter = require('./home');
function routes(app){
    app.use('/',homeRouter);
}
module.exports = routes;