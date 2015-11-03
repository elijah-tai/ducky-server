'use strict'

var mongoose = require('mongoose'),
		Schema = mongoose.Schema

var User = new Schema({
	d: String, // device ID
	u: String, // username
	p: {
		r: [String], // IDs of requests
		c: [Array] // IDs of conversations
	}
})

module.exports = mongoose.model('users', User)