'use strict'

var Conversation = require('../models/conversation'),
		Message = require('../models/message'),
		User = require('../models/user'),
		Request = require('../models/request')

// TODO: rewrite this with q's/promises
module.exports.create = function (req, res) {
	var conversation = new Conversation(req.body)
	// add to initiator's list of conversations
	User.findOne({ fid: req.body.i }, function (err, fromUser) {
		if (err) {
			res.sendStatus(500)
		}
		else {
			// add to fromUser's list of conversations
			fromUser.p.c.addToSet(req.body.cid)
			fromUser.save(function (err, result) {
				if (err) {
					res.sendStatus(500)
				}
				else {
					User.findOne({ fid: req.body.r }, function (err, toUser) {
						if (err) {
							res.sendStatus(500)
						}
						else {
							// add to toUser's list of conversations
							toUser.p.c.addToSet(req.body.cid)
							toUser.save(function (err, result) {
								if (err) {
									res.sendStatus(500)
								}
								else {
									Request.findOne( {rid: req.body.rid}, function (err, request) {
										if (err) {
											res.sendStatus(500)
										}
										else {
											// Add to the request's associated conversations
											request.c.addToSet(req.body.cid)
											request.save(function (err, result) {
												if (err) {
													res.sendStatus(500)
												}
												else {
													conversation.save(function (err, result) {
														if (err) {
															res.sendStatus(500)
														}
														else {
															res.json(result)
														}
													})
												}
											})
										}
									})
								}
							})
						}
					})
				}
			})
		}
	})
}

module.exports.list = function (req, res) {
	Conversation.find({}, function (err, results) {
		res.json(results)
	})
}

// attach a new message to a conversation
module.exports.add = function (req, res) {
	if (req.params.cid !== null || req.params.cid !== undefined) {
		var message = new Message(req.body)
		console.log(message)
		Conversation.findOne({cid: req.params.cid}, function (err, conversation) {
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
	if (req.params.cid !== null || req.params.cid !== undefined) {
		Conversation.remove({ cid: req.params.cid}, function (err) {
			res.sendStatus(200)
		})
	}
}