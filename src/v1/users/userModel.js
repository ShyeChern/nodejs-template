'use-strict';
const knex = require('../../../database/database');

module.exports.selectOne = async (condition) => {
  try {
    return await knex('users')
      .select('*')
      .where(condition)
      .first();
  } catch (err) {
    throw new AppError(AppError.DATABASE_ERROR, 500, true);
  }
}

module.exports.insert = async (data) => {
  try {
    return await knex('users')
      .returning('id')
      .insert(data);
  } catch (err) {
    throw new AppError(AppError.DATABASE_ERROR, 500, true);
  }
}