const jwt = require('jsonwebtoken');
const { infoLog } = require('../util/log');

module.exports.verifyToken = (req, res, next) => {
	try {
		if (!req.get('authorization')) {
			throw new UserError(UserError.UNAUTHORIZED, 401);
		}
		try {
			let decoded = jwt.verify(req.get('authorization').split(' ')[1], process.env.JWT_SECRET);
			req.jwt = { userId: decoded.userId };
		} catch (err) {
			infoLog(`IP: ${req.ip}, ${err.message} `);
			return next(new UserError(UserError.UNAUTHORIZED, 401));
		}

		return next();
	} catch (err) {
		return err;
	}
};
