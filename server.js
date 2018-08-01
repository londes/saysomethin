//server.js
'use-strict';
//first we import our dependencies…
var express = require('express');
var msgListener = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var SaysomethingText = require('./model/SaysomethingText');
var md5 = require('md5');
var fs = require('fs');
//and create our instances
var app = express();
var router = express.Router();
var path = require('path');

// parse our local-settings.json to pull in appropriate credentials
// var localSettingsJson = fs.readFileSync("local-settings.json");
// var localSettings = JSON.parse(localSettingsJson);
var localSettings = process.env;

// set up server port and db creds
var port = localSettings.PORT || 3001;
var db_username = localSettings.DB_USERNAME;
var db_password = localSettings.DB_PASSWORD;

//db config
mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${db_username}:${db_password}@ds131551.mlab.com:31551/saysomething_data`, {
  useMongoClient: true,
  useNewUrlParser: true,
});

//configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up static hosting for our index.html and other assets
app.use('/static', express.static(path.join(__dirname, '/build/static')));
app.use('/img', express.static(path.join(__dirname, '/build/img')));

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.sendFile(path.join(__dirname, '/build/', 'index.html'));
});

//route to push so everyone can see
router.route('/forthesakeofit')

  .get(function(req,res) {
    //looks at our text Schema
    SaysomethingText.find(function(err, saysomethinText) {
      if (err)
      res.send(err);
      res.json(saysomethinText)
    });
  })
  //post new text to the Database
  .post(function(req, res) {
    console.dir(req.body);
    var {
      msgText,
    } = req.body;
    var saysomethingText = new SaysomethingText({
      msgText: msgText,
    });

    mongoose.connection.collections['saysomethingtexts'].drop( function(err) {
      console.log('collection dropped');
    });

    saysomethingText.save(function(err) {
      if (err) {
        res.send(err);
      }
      console.log('got a request');
      res.json({message: 'text added'});
    });
  });

  router.route('/ryou')
    .post(function(req,res) {
    })

  router.route('/rtheworld')
    .get(function(req,res) {
    })
    .post(function(req, res) {
    })

//Use our router configuration when we call /api
app.use('/', router);

//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
