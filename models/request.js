'use strict'

// request model for mongoose
var mongoose = require('mongoose'),
		Schema = mongoose.Schema

var Request = new Schema({
	// need to add date
	rid: Number, // Request ID
	a: Number, // asker user id
	rc: String, // request content
	l: String, // request location - might be lat/long
	c: [Number], // ids of associated conversations
	time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('requests', Request)