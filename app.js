'use strict'

// dependencies
var express = require('express'),
		mongoose = require('mongoose'),
		path = require('path'),
    requestsController = require('./controllers/requests-controller')

// create instance of express
var app = express()
var routes = require('./routes/api.js')

// routes

// Need to figure out how user models are created
// app.use('/user/', routes) 

app.get('/api/requests', requestsController.list)
app.get('/api/requests', requestsController.create)

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res) {
  res.status(err.status || 500)
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }))
})

module.exports = app