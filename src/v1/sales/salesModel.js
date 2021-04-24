'use-strict';
const knex = require('../../../database/database');

module.exports.count = async (condition) => {
  try {
    return await knex('sales')
      .count({ total: 'id' })
      .where(condition)
      .first();
  } catch (err) {
    throw new AppError(AppError.DATABASE_ERROR, 500, true);
  }
}

module.exports.selectLimitOffset = async (condition, limit, offset) => {
  try {
    return await knex('sales')
      .select('*')
      .where(condition)
      .limit(limit)
      .offset(offset);
  } catch (err) {
    throw new AppError(AppError.DATABASE_ERROR, 500, true);
  }
}