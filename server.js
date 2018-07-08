//server.js
'use-strict';
//first we import our dependencies…
var express = require('express');
var msgListener = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var SaysomethinText = require('./model/SaysomethinText');
var md5 = require('md5');
var fs = require('fs');
//and create our instances
var app = express();
var router = express.Router();
var path = require('path');

// parse our local-settings.json to pull in appropriate credentials
var localSettingsJson = fs.readFileSync("local-settings.json");
console.log('local settings: ' + localSettingsJson);
// var localSettingsJson = process.env;

// set up server port and db creds
var port = localSettingsJson.PORT || 3001;
var db_username = localSettingsJson.DB_USERNAME;
var db_password = localSettingsJson.DB_PASSWORD;
console.log('db check: ' + db_username);

//db config
mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${db_username}:${db_password}@ds131551.mlab.com:31551/saysomething_data`, {
  useMongoClient: true,
});

//configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up static hosting
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

//adding the /videos route to our router
router.route('/rme')
  //retrieve all videos from db

  .get(function(req,res) {
    //looks at our Video Schema
    Video.find(function(err, videos) {
      if (err)
      res.send(err);
      res.json(videos)
    });
  })
  //post new video to the Database
  .post(function(req, res) {
    console.dir(req.body);
    var {
      msgText,
    } = req.body;
    var saysomethingText = new SaysomethingText({
      msgText: msgText,
    });

    saysomethinText.save(function(err) {
      if (err) {
        res.send(err);
      }
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
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
