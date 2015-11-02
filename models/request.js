'use strict'

// request model for mongoose
var mongoose = require('mongoose'),
		Schema = mongoose.Schema

var Request = new Schema({
	// need to add date
	asker: String, // username
	requestContent: String, 
	location: String,
	time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('requests', Request)