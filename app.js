'use strict';

// dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    requestsController = require('./api/request/request.controller'),
    usersController = require('./api/user/user.controller'),
    conversationsController = require('./api/conversation/conversation.controller');

mongoose.connect('mongodb://localhost/duckyapp-dev' || process.env.MONGO_URI );

// create instance of express
var app = express();
var routes = require('./routes/api.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
// ==============================================
// Need to figure out how user models are created
app.use('/api', routes);


app.get('/api/requests', requestsController.list);
app.post('/api/requests', requestsController.create);
app.delete('/api/requests/:rid', requestsController.delete);

app.get('/api/users', usersController.list);
app.get('/api/users/findConvos/:fid', usersController.findConvos);
app.get('/api/users/findUser/:fid', usersController.findUser);
app.post('/api/users', usersController.create);
app.delete('/api/users:fid', usersController.delete);

app.get('/api/conversations', conversationsController.list);
app.post('/api/conversations', conversationsController.create);
app.post('/api/conversations/:cid', conversationsController.add); // adds message to convo
app.delete('/api/conversations/:cid', conversationsController.delete);

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err)
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }))
});

module.exports = app;
