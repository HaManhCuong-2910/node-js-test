const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const hbsrgs = require('handlebars');
const routes = require('./routes/routes');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./model/connect');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const SocketServices = require('./services/socket.service');
const handlebarsService = require('./services/handlebars.service');
// const sendMail = require('./app/Email/sendMail');
// const schedule = require('node-schedule');

//use io in controller
global._io = io;

app.use(express.static(path.join(__dirname,'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


db.connect();

app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

handlebarsService.registers(hbsrgs);

const sessionMiddleware = session({
  secret: "changeit",
  resave: false,
  saveUninitialized: false
});

app.use(sessionMiddleware);
// var i = 0;
// schedule.scheduleJob('*/2 * * * * * ', ()=>{
//   i += 1;
//   console.log(i);
// });

routes(app);

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

global._io.on('connection', SocketServices.connection);

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})