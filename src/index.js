const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const routes = require('./routes/routes');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./model/connect');
const app = express();
const port = process.env.PORT || 3000;
// const sendMail = require('./app/Email/sendMail');
// const schedule = require('node-schedule');

app.use(express.static(path.join(__dirname,'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

db.connect();

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
// var i = 0;
// schedule.scheduleJob('*/2 * * * * * ', ()=>{
//   i += 1;
//   console.log(i);
// });

routes(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})