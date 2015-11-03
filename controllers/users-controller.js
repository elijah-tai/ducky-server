'use strict'

var User = require('../models/user')

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

module.exports.delete = function (req, res) {
	if (req.params.id !== null || req.params.id !== undefined) {
		User.remove({ _id: req.params.id}, function (err) {
			res.send(200)
		})
	}
}

