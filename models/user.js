'use strict'

var mongoose = require('mongoose'),
		Schema = mongoose.Schema

var User = new Schema({
	deviceID: String,
	username: String
})

module.exports = mongoose.model('users', User)