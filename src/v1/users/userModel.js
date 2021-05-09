'use-strict';
const knex = require('../../../database/database');

module.exports.selectOne = async (condition) => {
  try {
    return await knex('users')
      .select('*')
      .where(condition)
      .first();
  } catch (err) {
    throw new Error(err)
  }
}

module.exports.insert = async (data) => {
  try {
    return await knex('users')
      .returning('id')
      .insert(data);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports.joinSales = async (condition) => {
  try {
    return await knex('users')
      .select('users.username', 'sales.package_name', 'sales.quantity', 'sales.sales_date', 'sales.attachment')
      .innerJoin('sales', 'users.id', 'sales.user_id')
      .where(condition);
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Sample transaction for multiple query in one time
 */
module.exports.sampleTransaction = async (data) => {
  try {
    return await knex.transaction(async (trx) => {
      let insertId = await trx('users')
        .returning('id')
        .insert(data);

      await trx('users')
        .returning('id')
        .update({ username: 'updated' })
        .where({ id: insertId[0] });

      return insertId
    })

  } catch (err) {
    throw new Error(err)
  }
}