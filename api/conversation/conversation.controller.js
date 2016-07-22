'use strict';

var Conversation = require('conversation'),
	Message = require('../message/message.model'),
	User = require('../../models/user'),
	Request = require('../request/request.model');


function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function( err ) {
        res.status(statusCode).send(err);
    }
}

module.exports.create = function(req, res) {
    var conversation = new Conversation(req.body);
    // add to initiator's list of conversations
    return User.findOne({fid: req.body.i}).exec()
        .then(handleEntityNotFound(res))
        .catch(handleError(res, err))
};

module.exports.list = function (req, res) {
	Conversation.find({}, function (err, results) {
		res.json(results)
	});
};

// attach a new message to a conversation
module.exports.add = function (req, res) {
	if (req.params.cid !== null || req.params.cid !== undefined) {
		var message = new Message(req.body);
		console.log(message);
		Conversation.findOne({cid: req.params.cid}, function (err, conversation) {
			if (err) {
				res.sendStatus(500)
			}
			else {
				conversation.m.addToSet(message);
				conversation.save(function (err, result) {
					res.json(conversation)
				})
			}
		})
	}
};

module.exports.delete = function (req, res) {
	if (req.params.cid !== null || req.params.cid !== undefined) {
		Conversation.remove({ cid: req.params.cid}, function (err) {
			res.sendStatus(200)
		})
	}
};

