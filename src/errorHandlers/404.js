'use strict';

module.exports = (req, res) => {
    if (req.method !== 'GET') {res.status(404).send('ERROR: This route is for GET requests only')}
    else {res.status(404).send('ERROR: Route not found')};
};