var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
var db;

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

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

app.post('/auth', function(req, res) {
	console.log("hey");
	console.log(req.body.email);
	db.collection('users').findOne({"email": req.body.email}, (err, doc) => {
		if(req.body.password === doc.password)
		{
			res.cookie('uid', doc._id);
			res.redirect('/app/user/' + doc._id);
		} else {
			res.redirect('/');
		}
	})

});

app.get('/users/goals', function(req, res) {
	db.collection('goals').find({"uid": req.cookies.uid}).toArray((err, docs) => {
		res.send(JSON.stringify(docs));
	})

})

app.post('/logout', function(req, res) {
	res.clearCookie('uid');
	res.redirect('/');
})

app.post('/users/goals', function(req, res) {
	req.body.uid = req.cookies.uid;
	db.collection('goals').insert(req.body, (err, result) => {
		if (err) return console.log(err);

		res.redirect('/app/user/' + req.body._id);
	})
})

app.delete('/users/goals/:gid', function(req, res) {
	db.collection('goals').deleteOne({"_id": ObjectId(req.params.gid)});
})

app.get('/users/info', function(req, res) {
	db.collection('users').find({"_id": ObjectId(req.cookies.uid)}).toArray((err, docs) => {
		res.send({"first": docs[0].firstname, "last": docs[0].lastname});
	})
})

app.post('/login', function(req, res) {
	db.collection('users').insert(req.body, (err, result) => {
		if (err) return console.log(err);

		res.cookie('uid', req.body._id);
		res.redirect('/app/user/' + req.body._id);
	})
});

app.use('/', express.static('app/public'));

app.listen(3000, function(err) {
	if(err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3000/');
});
