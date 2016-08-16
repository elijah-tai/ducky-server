'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: 'ducky-secret',

    FACEBOOK_ID: '534494246736908',
    FACEBOOK_SECRET: '0a1acce9ac14bdc55cac03770a3ec0ce',

    GOOGLE_ID: '286307785444-9r68jqls84fm3tucjlcdct32d8mdihc6.apps.googleusercontent.com',
    GOOGLE_SECRET: 'hjWDa6HNEjHYAca1_ErFzj97'
};
