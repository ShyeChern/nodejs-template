const jwt = require('jsonwebtoken');
const { infoLog } = require('../util/log');
const { UserError } = require('../util/error');
/**
 * Middleware that receive roles that able to access the route
 * @param {array} role array of role level in integer
 * 1 = anyone
 * 2 = admin
 * ...
 */
module.exports.verifyAccess = (role) => {
	return (req, res, next) => {
		try {
			// check token
			if (!req.get('authorization')) {
				throw new UserError(UserError.UNAUTHORIZED, 401);
			}
			try {
				let decoded = jwt.verify(req.get('authorization').split(' ')[1], process.env.JWT_SECRET);
				req.jwt = { userId: decoded.userId, role: 2 }; // hardcode role level for testing
			} catch (err) {
				infoLog(`IP: ${req.ip}, ${err.message} `);
				return next(new UserError(UserError.UNAUTHORIZED, 401));
			}

			// check role access
			if (!role.includes(req.jwt.role)) {
				throw new UserError(UserError.FORBIDDEN, 403);
			}

			return next();
		} catch (err) {
			return next(err);
		}
	};
};
