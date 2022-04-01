var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const {MongoClient} = require("mongodb");
const url = 'mongodb+srv://SergioArroni:julio321@tiendamusica.hhkbe.mongodb.net/tiendamusica?retryWrites=true&w=majority';
app.set('connectionStrings', url);
let songsRepository = require("./repositories/songsRepository.js");
songsRepository.init(app, MongoClient);
require("./routes/songs.js")(app, songsRepository);
require("./routes/authors.js")(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = function (app) {
    app.get("/songs", function (req, res) {

        let response = "";
        if (req.query.title != null && typeof (req.query.title) != "undefined")
            response = 'Titulo: ' + req.query.title + '<br>'
        if (req.query.auth != null && typeof (req.query.auth) != "undefined")
            response += 'Autor' + req.query.auth;
        res.send(response);
    });
};

module.exports = function (app) {
    app.get("/authors", function (req, res) {

        let response = "";
        if (req.query.name != null && typeof (req.query.name) != "undefined")
            response = 'Nombre: ' + req.query.name + '<br>'
        if (req.query.group != null && typeof (req.query.group) != "undefined")
            response += 'Grupo: ' + req.query.group;
        if (req.query.rol != null && typeof (req.query.rol) != "undefined")
            response += 'Rol: ' + req.query.rol;
        res.send(response);
    });
};

module.exports = app;
