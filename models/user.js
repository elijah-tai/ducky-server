'use strict'

var mongoose = require('mongoose'),
		Request = require('./request'),
		Conversation = require('./conversation'),
		Schema = mongoose.Schema

var User = new Schema({
	fn: String, // first name
	fid: Number, // facebook ID
	pp: String, // profile picture URL
	p: {
		r: [Number], // IDs of requests
		c: [Number] // IDs of conversations
	}
})

module.exports = mongoose.model('users', User)
