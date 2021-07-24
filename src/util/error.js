const ErrorMessage = {
	401: 'Unauthorized access',
	403: 'Forbidden access',
	500: 'Internal server error, please try again later. If this error persist please contact our support.',
	100001: 'Invalid username or password.',
	100002: 'Username must have at least 3 to 30 characters.',
	100003:
		'Password must have minimum eight and maximum 20 characters, at least one uppercase letter,' +
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
	100016: 'Invalid csv file.',
};

/**
 * Custom User Error
 */
class UserError extends Error {
	/**
	 * Construct error with own message, error code and status code
	 * @param {int} errorCode own reference error code
	 * @param {int} statusCode http status code
	 */
	constructor(errorCode, statusCode = 400) {
		super(ErrorMessage[errorCode]);
		// assign the error class name in your custom error
		this.name = this.constructor.name;
		// capturing the stack trace keeps the reference to your error sclass
		Error.captureStackTrace(this, this.constructor);

		this.errorCode = errorCode;
		this.statusCode = statusCode;
	}
}

UserError.UNAUTHORIZED = 401;
UserError.FORBIDDEN = 403;
UserError.INVALID_CREDENTIALS = 100001;
UserError.INVALID_USERNAME = 100002;
UserError.INVALID_PASSWORD = 100003;
UserError.PASSWORD_NOT_MATCH = 100004;
UserError.INVALID_IMAGE = 100005;
UserError.USERNAME_EXIST = 100006;
UserError.FILE_NOT_EXIST = 100007;
UserError.INVALID_USER_ID = 100008;
UserError.INVALID_PACKAGE_NAME = 100009;
UserError.INVALID_PACKAGE_QUANTITY = 100010;
UserError.INVALID_DATE_FORMAT = 100011;
UserError.INVALID_ATTACHMENT = 100012;
UserError.INVALID_SALE_ID = 100013;
UserError.INVALID_EMAIL = 100014;
UserError.EMAIL_USED = 100015;
UserError.INVALID_CSV = 100016;

module.exports = {
	UserError,
	ErrorMessage,
};
