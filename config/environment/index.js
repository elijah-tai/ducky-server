'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'higgins-secret'
    },

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },

    facebook: {
        clientID:     process.env.FACEBOOK_ID || '269747816720441',
        clientSecret: process.env.FACEBOOK_SECRET || '873c552854f9d3ab51e9faf8b0d38b9c',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    twitter: {
        clientID:     process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
        clientID:     process.env.GOOGLE_ID || '286307785444-9r68jqls84fm3tucjlcdct32d8mdihc6.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'hjWDa6HNEjHYAca1_ErFzj97',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./shared'),
    require('./' + process.env.NODE_ENV + '.js') || {});