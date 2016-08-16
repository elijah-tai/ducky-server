'use strict';

// request model for mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RequestSchema = new Schema({
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	}, // asker user id
	title: {
		type: String,
		trim: true
	}, // request title
	content: {
		type: String,
		trim: true
	}, // request content
	location: {
		type: String,
		trim: true
	}, // request location POI
}, {
	timestamps: true
});

export default mongoose.model('Request', RequestSchema);
