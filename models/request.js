'use strict'

// question model for mongoose
var mongoose = require('mongoose'),
		Schema = mongoose.Schema

var Request = new Schema({
	// need to add date
	asker: String, // username
	requestContent: String, 
	location: String
})

module.exports = mongoose.model('requests', Request)