'use strict'

var mongoose = require('mongoose'),
		Request = require('./request'),
		Conversation = require('./conversation'),
		Schema = mongoose.Schema

var User = new Schema({
	d: String, // device ID
	u: String, // username
	p: {
		r: [Request.schema], // IDs of requests
		c: [Conversation.schema] // IDs of conversations
	}
})

module.exports = mongoose.model('users', User)