const Joi = require('joi');
const GeneralModel = require('../../util/generalModel');
const userGeneralModel = new GeneralModel('users');
const { UserError } = require('../../util/error');

const email = Joi.string()
	.email()
	.required()
	.error(() => {
		throw new UserError(UserError.INVALID_EMAIL);
	});

const username = Joi.string()
	.alphanum()
	.min(3)
	.max(30)
	.required()
	.error(() => {
		throw new UserError(UserError.INVALID_USERNAME);
	});

const password = Joi.string()
	// 8 to 20 characters with at least 1 lowercase letter, uppercase letter, number and special character
	.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$'))
	.required()
	.error(() => {
		throw new UserError(UserError.INVALID_PASSWORD);
	});

module.exports.validateAddUser = async (input) => {
	// not in variable above to ensure resusability (for update etc...)
	const schema = Joi.object({
		email: email.external(async (value) => {
			let userCount = (await userGeneralModel.count({ email: value }, 'id')).count;
			if (userCount !== '0') {
				throw new UserError(UserError.EMAIL_USED);
			}
		}),
		username: username.external(async (value) => {
			let userCount = (await userGeneralModel.count({ username: value }, 'id')).count;
			if (userCount !== '0') {
				throw new UserError(UserError.USERNAME_EXIST);
			}
		}),
		password,
		confirmPassword: Joi.any()
			.valid(Joi.ref('password'))
			.error(() => {
				throw new UserError(UserError.PASSWORD_NOT_MATCH);
			}),
	});

	return schema.validateAsync(input);
};
