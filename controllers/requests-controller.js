'use strict'

var Request = require('../models/request')

module.exports.create = function (req, res) {
	var request = new Request(req.body)
	request.save(function (err, result) {
		res.json(result)
	})
}

module.exports.list = function (req, res) {
	Request.find({}, function (err, results) {
		res.json(results)
	})
}

module.exports.delete = function (req, res) {
	if (req.params.id !== null || req.params.id !== undefined) {
		Request.remove({ _id: req.params._id}, function (err) {
			res.sendStatus(200)
		})
	}
}