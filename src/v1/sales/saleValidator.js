const Joi = require('joi').extend(require('@joi/date'));
const userModel = require('../users/userModel');
const saleModel = require('./saleModel');

const id = Joi.number()
  .integer()
  .required()
  .external(async (value) => {
    let sale = await saleModel.selectOne({ id: value });
    if (!sale) {
      throw new AppError(AppError.INVALID_SALE_ID);
    }
  })
  .error(() => { throw new AppError(AppError.INVALID_SALE_ID) });

const userId = Joi.number()
  .integer()
  .required()
  .external(async (value) => {
    let user = await userModel.selectOne({ id: value });
    if (!user) {
      throw new AppError(AppError.INVALID_USER_ID);
    }
  })
  .error(() => { throw new AppError(AppError.INVALID_USER_ID) });

const packageName = Joi.string()
  .valid('Red', 'Yellow', 'Blue')
  .required()
  .error(() => { throw new AppError(AppError.INVALID_PACKAGE_NAME) });

const quantity = Joi.number()
  .integer()
  .min(1)
  .required()
  .error(() => { throw new AppError(AppError.INVALID_PACKAGE_QUANTITY) });

const saleDate = Joi.date()
  .format('YYYY-MM-DD')
  .required()
  .error(() => { throw new AppError(AppError.INVALID_DATE_FORMAT) });

module.exports.validateAddSale = (input) => {
  try {
    const schema = Joi.object({
      userId,
      packageName,
      quantity,
      saleDate
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

module.exports.validateUpdateSale = (input) => {
  try {
    const schema = Joi.object({
      id,
      userId,
      packageName,
      quantity,
      saleDate
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

module.exports.validateDeleteSale = (input) => {
  try {
    const schema = Joi.object({
      id
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