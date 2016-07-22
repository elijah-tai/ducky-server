'use strict';

// message model for mongoose
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var Message = new Schema({
	f: Number, // User ID from
	t: Number, // User ID to
	c: String, // message content
	time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('messages', Message);
