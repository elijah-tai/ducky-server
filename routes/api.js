'use strict'

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose')

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the Ducky API.'})
})

module.exports = router;