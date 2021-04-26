const Joi = require('joi');
const userModel = require('./userModel');

const email = Joi.string()
  .email()
  .required()
  .external(async (value) => {
    let user = await userModel.selectOne({ email: value });
    if (user) {
      throw new AppError(AppError.EMAIL_USED);
    }
  })
  .error(() => { throw new AppError(AppError.INVALID_EMAIL) });

const username = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
  .error(() => { throw new AppError(AppError.INVALID_USERNAME) });

const password = Joi.string()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$'))
  .required()
  .error(() => { throw new AppError(AppError.INVALID_PASSWORD) });

module.exports.validateAddUser = (input) => {
  try {
    const schema = Joi.object({
      email,
      username,
      password,
      confirmPassword: Joi.any().valid(Joi.ref('password'))
        .error(() => { throw new AppError(AppError.PASSWORD_NOT_MATCH) })
    });

    return schema.validateAsync(input);

  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    } else {
      throw new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true);
    }
  }
}