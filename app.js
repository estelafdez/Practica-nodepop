var createError = require('http-errprs');
var express = require('express');
var path = require ('path');
var cookieParser = require('cookie-parser');
var logger = require ('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { use } = require('./routes/index');


require ('./lib/connectMongoose');
require ('./routes/api/products')


var app = express();

// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * API routes
 */

app.use ('./routes/api/products', require('./routes/api/products'));


app.use('/', indexRouter);
app.use('./routes/users.js', usersRouter);

//catch 404 and foward to error handler

app.use(function(req, res, next){
    next(createError(404));
});

//error handler

app.use(function(err, req, res, next){
    res.status(err.status || 500);

// JSON-formatted respons if it is an API request
if (req.originalUrl.startWith('/routes/api/products.js')){
    res.json ({error: err.message});
    return;
}

//set locals, only providing error in developement
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

//render the error page

res.render('error');

});

module.exports = app;