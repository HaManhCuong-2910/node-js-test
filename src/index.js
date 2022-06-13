const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const routes = require('./routes/routes');
const session = require('express-session')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

routes(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})