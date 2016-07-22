'use strict';

var Request = require('request'),
	User = require('../../models/user');

module.exports.create = function (req, res) {
	var request = new Request(req.body);
	User.findOne( {fid: req.body.a }, function (err, user) {
		if (err) {
			res.sendStatus(500)
		}
		else {
			user.p.r.addToSet(req.body.rid);
			console.log(user);
			user.save(function (err, result) {
				if (err) {
					res.sendStatus(500)
				}
				else {
					request.save(function (err, result) {
						res.json(result)
					})
				}
			})
		}
	})
};

module.exports.list = function (req, res) {
	Request.find({}, function (err, results) {
		res.json(results)
	})
};

module.exports.delete = function (req, res) {
	if (req.params.rid !== null || req.params.rid !== undefined) {
		Request.remove({ rid: req.params.rid}, function (err) {
			res.sendStatus(200)
		})
	}
};
