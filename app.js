var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuariosRouter = require('./routes/usuarios');
var productosRouter = require('./routes/productos');
var empleadosRouter = require('./routes/empleados');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();  // <-- Aquí debe ir primero

// Configurar conexión a MongoDB
var mongoDB = 'mongodb://127.0.0.1:27017/myappdb';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configurar motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/empleados', empleadosRouter);

// Capturar 404 y manejar error
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador general de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
