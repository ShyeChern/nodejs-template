const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  try {
    if (!req.get('authorization')) {
      throw new AppError(AppError.UNAUTHORIZED, 401, true);
    }
    try {
      let decoded = jwt.verify(req.get('authorization').split(" ")[1], process.env.JWT_SECRET);
      req.jwt = { userId: decoded.userId };
    } catch (err) {
      throw new AppError(AppError.UNAUTHORIZED, 401, true);
    }

    return next();

  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    } else {
      return next(new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true));
    }
  }
}