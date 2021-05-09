'use-strict';
const knex = require('../../../database/database');

module.exports.selectOne = async (condition) => {
  try {
    return await knex('sales')
      .select('*')
      .where(condition)
      .first();
  } catch (err) {
    throw new Error(err)
  }
}

module.exports.count = async (condition) => {
  try {
    return await knex('sales')
      .count({ total: 'id' })
      .where(condition)
      .first();
  } catch (err) {
    throw new Error(err)
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
    throw new Error(err)
  }
}

module.exports.insert = async (data) => {
  try {
    return await knex('sales')
      .returning('id')
      .insert(data);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports.update = async (data, condition) => {
  try {
    return await knex('sales')
      .update(data)
      .where(condition);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports.delete = async (condition) => {
  try {
    return await knex('sales')
      .delete()
      .where(condition);
  } catch (err) {
    throw new Error(err)
  }
}