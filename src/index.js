const express = require('express');
const compression = require('compression')
const path = require('path');
const handlebars = require('express-handlebars');
const hbsrgs = require('handlebars');
const routes = require('./routes/routes');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const db = require('./model/connect');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const SocketServices = require('./services/socket.service');
const handlebarsService = require('./services/handlebars.service');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);
const clientRedis = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
const localesService = require('./services/locales.service');
// const sendMail = require('./app/Email/sendMail');
// const schedule = require('node-schedule');

//use io in controller
global._io = io;

app.use(compression({
  level: 6,
  threshold: 10 * 1000
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


db.connect();

app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

localesService.configure(app);
handlebarsService.registers(hbsrgs);

const sessionMiddleware = session({
  secret: "itravel key",
  store: new RedisStore({client: clientRedis}),
  resave: false,
  saveUninitialized: false
});

app.use(sessionMiddleware);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.cookies = req.cookies;
  next();
});

// var i = 0;
// schedule.scheduleJob('*/2 * * * * * ', ()=>{
//   i += 1;
//   console.log(i);
// });

routes(app);

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

// io.use(async function(socket, next) {
//   if(socket.handshake.query.token == 'cuongkum'){
//     return next();
//   }
//   else{
//     return next(new Error('Authentication error'));
//   }  
// });

global._io.on('connection', SocketServices.connection);

server.listen(port, (err) => {
  if(err){
    console.log(err);
  }
  console.log(`App listening at http://localhost:${port}`)
})