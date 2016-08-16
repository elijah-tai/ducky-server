'use strict';

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip:     process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

    // Server port
    port:   process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,

    // MongoDB connection options
    mongo: {
        uri:  process.env.MONGODB_URI ||
        process.env.MONGOHQ_URL ||
        process.env.OPENSHIFT_MONGODB_DB_URL +
        process.env.OPENSHIFT_APP_NAME ||
        'mongodb://localhost/ducky'
    },

    // wj's twilio
    twilio: {
        accountSid: process.env.TWILIO_SID || 'AC360ef829d096f3395c5b31a14d7bed28',
        authToken: process.env.TWILIO_AUTH_TOKEN || '24c72c1643740874096b8ae98a014508',
        phoneNumber: process.env.TWILIO_NUM || '+16476943681'
    }

};