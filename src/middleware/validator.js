'use strict';

module.exports = (req, res, next) => {
    if (!req.query.name) {throw new Error('ERROR: Your \'name\' query parameter is not defined.')}
    next();
}