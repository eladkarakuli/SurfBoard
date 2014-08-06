/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var SCB = require('social-cms-backend');

// Connect to database
/*mongoose.connect(config.mongo.uri, config.mongo.options);*/

// Populate DB with sample data
//if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();

// Set social cms backend
app.use(SCB.middleware({
  mongodb_url: 'mongodb://localhost:27017/socialcmsdb',
  // Disable facebook connection
  /*passport_strategy: 'facebook',
  facebook_app_id: process.env.FACEBOOK_APP_ID,
  facebook_app_secret: process.env.FACEBOOK_APP_SECRET*/
}));

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;