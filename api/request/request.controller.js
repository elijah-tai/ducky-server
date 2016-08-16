/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tasks              ->  index
 * POST    /api/tasks              ->  create
 * GET     /api/tasks/:id          ->  show
 * PUT     /api/tasks/:id          ->  update
 * DELETE  /api/tasks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import logger from 'winston';
import mongoose from 'mongoose';

function respondWithResult(res, statusCode) {
	statusCode = statusCode || 200;
	return function(entity) {
		if (entity) {
			res.status(statusCode).json(entity);
			return res;
		}
	};
}

function saveUpdates(updates) {
	return function(entity) {
		var updated = _.extend(entity, updates);
		return updated.save()
			.then(updated => {
				logger.info('requestController.saveUpdates - updated: ' + updated);
				return updated;
			});
	};
}

function removeEntity(res) {
	return function(entity) {
		if (entity) {
			return entity.remove()
				.then(() => {
					res.status(204).end();
					return res;
				});
		}
	};
}

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
	return function(err) {
		res.status(statusCode).send(err);
	};
}

// Gets a list of Requests
export function index(req, res) {
	return Request.find().exec()
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Gets a single Request from the DB
export function show(req, res) {
	return Request.findById(req.params.id).exec()
		.then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Creates a new Request in the DB
export function create(req, res) {
	var newRequest = new Request(req.body);
	logger.info('requestController.create - req.body: ' + req.body);
	return newRequest.save()
		.then(respondWithResult(res, 201))
		.catch(handleError(res));
}

// Updates an existing Request in the DB
export function update(req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	return Request.findById(req.params.id).exec()
		.then(handleEntityNotFound(res))
		.then(saveUpdates(req.params.id, req.body))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Deletes a Request from the DB
export function destroy(req, res) {

	return Request.findById(req.params.id).exec()
		.then(handleEntityNotFound(res))
		.then(removeEntity(res))
		.catch(handleError(res));
}