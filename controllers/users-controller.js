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
	if (req.params.fid !== null || req.params.fid !== undefined) {
		User.remove({ fid: req.params.fid}, function (err) {
			res.sendStatus(200)
		})
	}
}

