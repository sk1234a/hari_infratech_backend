var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var constructionRouter = require('./routes/construction');
var repairingRouter = require('./routes/repairing');
var interiorRouter = require('./routes/interior');
var fabricationRouter = require('./routes/fabrication');
var contactRouter = require('./routes/contact');

var app = express();

app.use(cors());
app.use(express.json());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// USERS LOGIN REGISTER
app.use("/api", usersRouter);

// SERVICES
app.use("/api/construction",constructionRouter);
app.use("/api/repairing",repairingRouter);
app.use("/api/interior",interiorRouter);
app.use("/api/fabrication",fabricationRouter);
app.use("/api/contact",contactRouter);

module.exports = app;