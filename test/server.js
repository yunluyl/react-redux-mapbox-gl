var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

app.set('views', path.join(__dirname, 'index'));
app.set('view engine', 'pug');
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.get('/', function(req, res)
{
	res.render('index');
});


app.listen(3000, function()
{
	console.log('Server started on port 3000');
});