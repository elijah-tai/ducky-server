'use strict'

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = require('../models/user.js')

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the Ducky API.'})
})

module.exports = router