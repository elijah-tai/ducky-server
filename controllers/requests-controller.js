'use strict'

var Request = require('../models/request');

module.exports.create = function (req, res) {
	var request = new Request(req.body);
	request.save(function (err, result) {
		res.json(result);
	})
}

module.exports.list = function (req, res, user) {
	Request.find({}, function (err, results) {
		res.json(results);
	});
}