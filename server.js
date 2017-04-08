var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/app/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
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
