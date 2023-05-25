require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var logger = require('morgan');
const routes = require('./routes.js');
const auth = require("./auth.js");
const MyDB = require("./connect");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo');
const store = new MongoStore({ mongoUrl: process.env.MONGO_URI });
var passRouter = require("./routes/passGen");
const Account = require('./models/Account.js');
const managePass = require('./routes/managePass.js');
const mpSubmit = require('./routes/mpSubmit.js');
const mpVerify = require('./routes/mpVerifiy.js');
const mpGet = require('./routes/mpGet.js');

var app = express();
app.use(cors({
  credentials: true,
  origin: 'https://unipassv2.vercel.app/',
}));

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: store,
  key: "express.sid",
  cookie: { secure: false }
}));


MyDB();
app.use("/api/pass", passRouter);
auth(app, Account);
routes(app, Account);
managePass(app, Account);
mpSubmit(app, Account);
mpVerify(app, Account);
mpGet(app, Account);
app.get("/", (req ,res) => {
  res.send("hi")
})
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    console.log(`app is listening to PORT ${PORT}`)
})

//process.on('warning', e => console.warn(e.stack));
// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/
module.exports = app;
