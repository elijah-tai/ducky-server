'use strict'

var Conversation = require('../models/conversation'),
		Message = require('../models/message')

module.exports.create = function (req, res) {
	var conversation = new Conversation(req.body)
	conversation.save(function (err, result) {
		res.json(result)
	})
}

module.exports.list = function (req, res) {
	Conversation.find({}, function (err, results) {
		res.json(results)
	})
}

// attach a new message to a conversation
module.exports.add = function (req, res) {
	if (req.params.id !== null || req.params.id !== undefined) {
		var message = new Message(req.body)
		console.log(message)
		Conversation.findOne({_id: req.params._id}, function (err, conversation) {
			if (err) {
				res.sendStatus(500)
			}
			else {
				console.log(req.body)
				conversation.m.addToSet(message)
				conversation.save(function (err, result) {
					res.json(conversation)
				})
			}
		})
	}
}

module.exports.delete = function (req, res) {
	if (req.params.id !== null || req.params.id !== undefined) {
		Conversation.remove({ _id: req.params._id}, function (err) {
			res.sendStatus(200)
		})
	}
}