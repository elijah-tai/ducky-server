'use strict'

// Conversation model for mongoose
var mongoose = require('mongoose'),
		Message = require('./message'),
		Schema = mongoose.Schema

var Conversation = new Schema({
	i: String, // User ID who initiated
	r: String, // User ID who received
	rid: String, // id of associated request
	m: [Message.schema], // associated messages
	time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('conversations', Conversation)