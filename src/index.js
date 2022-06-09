const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const routes = require('./routes/routes');
const app = express();
const port = process.env.PORT || 3000;

app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})