const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const routes = require('./routes/routes');
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const sendMail = require('./app/Email/sendMail');
const schedule = require('node-schedule');

app.use(express.static(path.join(__dirname,'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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
schedule.scheduleJob('*/10 * * * * * ', ()=>{
  sendMail('hamanhcuong.gaapnow@gmail.com','Test auto send mail','Test auto send mail');
});

routes(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})