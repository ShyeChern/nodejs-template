const ErrorMessage = {
  401: 'Unauthorized access',
  500: 'Internal server error, please try again later. If this error persist please contact our support.',
  100001: 'Invalid username or password.',
  100002: 'Username must have at least 3 to 30 characters.',
  100003: 'Password must have minimum eight and maximum 20 characters, at least one uppercase letter,' +
    ' one lowercase letter, one number and one special character.',
  100004: 'Password does not matched.',
  100005: 'Invalid image. Only jpg, png, gif image with maximum 2 MB size are allowed.',
  100006: 'Username exist.',
  100007: 'The requested file does not exist.',
  100008: 'Invalid user id.',
  100009: 'Only Red, Yellow, Blue package are available.',
  100010: 'Invalid package quantity.',
  100011: 'Invalid date format.',
  100012: 'Invalid attachment. Only pdf file with maximum 5 MB are allowed',
  100013: 'Invalid sale id.',
  100014: 'Invalid email address.',
  100015: 'Email exist.',
  900001: 'Internal server error, please try again later. If this error persist please contact our support.',
}

/**
 * Custom error
 */
class AppError extends Error {
  /**
   * Construct error with own message, error code and status code
   * @param {int} errorCode own reference error code
   * @param {int} statusCode http status code
   * @param {boolean} showErrorCode whether to show error code for reference
   */
  constructor(errorCode, statusCode = 400, showErrorCode = false) {
    super(ErrorMessage[errorCode])
    // assign the error class name in your custom error
    this.name = this.constructor.name
    // capturing the stack trace keeps the reference to your error sclass
    Error.captureStackTrace(this, this.constructor);

    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.showErrorCode = showErrorCode;
  }
}

AppError.UNAUTHORIZED = 401;
AppError.INTERNAL_SERVER_ERROR = 500;
AppError.INVALID_CREDENTIALS = 100001;
AppError.INVALID_USERNAME = 100002;
AppError.INVALID_PASSWORD = 100003;
AppError.PASSWORD_NOT_MATCH = 100004;
AppError.INVALID_IMAGE = 100005;
AppError.USERNAME_EXIST = 100006;
AppError.FILE_NOT_EXIST = 100007;
AppError.INVALID_USER_ID = 100008;
AppError.INVALID_PACKAGE_NAME = 100009;
AppError.INVALID_PACKAGE_QUANTITY = 100010;
AppError.INVALID_DATE_FORMAT = 100011;
AppError.INVALID_ATTACHMENT = 100012;
AppError.INVALID_SALE_ID = 100013;
AppError.INVALID_EMAIL = 100014;
AppError.EMAIL_USED = 100015;
AppError.DATABASE_ERROR = 900001;

global.AppError = module.exports = AppError;