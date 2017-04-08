var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
var db;

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://admin:admin@ds035806.mlab.com:35806/piggybank', (err, database) => {
	if (err) return console.log(err);
	db = database;
});

app.get('/app/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname, 'app/signup.html'));
})

app.post('/login', function(req, res) {
	db.collection('users').save(req.body, (err, result) => {
		if (err) return console.log(err);

		res.redirect('/app/user/' + req.body.email);
	})
});

app.use('/', express.static('app/public'))


/*.get('/static/', function(req, res) {
	res.sendFile(path.join(__dirname, '/app/static/index.html'));
});*/

//app.use('/static', express.static(path.join(__dirname, '/app/static/')));

app.listen(3000, function(err) {
	if(err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3000/');
});
