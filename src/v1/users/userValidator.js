const Joi = require('joi');

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
      username,
      password,
      confirmPassword: Joi.any().valid(Joi.ref('password'))
        .error(() => { throw new AppError(AppError.PASSWORD_NOT_MATCH) })
    });

    return schema.validate(input);

  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    } else {
      throw new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true);
    }
  }
}