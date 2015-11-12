'use strict'

var User = require('../models/user'),
		Conversation = require('../models/conversation')

module.exports.create = function (req, res) {
	var user = new User(req.body)
	user.save(function (err, result) {
		res.json(result)
	})
}

module.exports.list = function (req, res) {
	User.find({}, function (err, results) {
		res.json(results)
	})
}


module.exports.findConvos = function (req, res) {
	if (req.params.fid !== null || req.params.fid !== undefined ) {
		User.findOne({ fid: req.params.fid }, "p.c", function (err, userConvos) {
			if (err) {
				res.sendStatus(500)
			}
			else {
				Conversation.find({cid: {$in: userConvos.p.c}}, function (err, docs) {
					res.json(docs)
				})
			}
		})
	}
}

module.exports.findUser = function (req, res) {
	if (req.params.fid !== null || req.params.fid !== undefined) {
		User.findOne({ fid: req.params.fid }, function (err, user) {
			if (err) {
				res.sendStatus(500)
			}
			else {
				res.json(user)
			}
		})
	}
}

module.exports.delete = function (req, res) {
	if (req.params.fid !== null || req.params.fid !== undefined) {
		User.remove({ fid: req.params.fid}, function (err) {
			res.sendStatus(200)
		})
	}
}

