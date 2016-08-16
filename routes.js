/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {

    // Insert routes below
    app.use('/api/tasks', require('./api/task'));
    app.use('/api/members', require('./api/member'));
    app.use('/api/groups', require('./api/group'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth').default);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

}