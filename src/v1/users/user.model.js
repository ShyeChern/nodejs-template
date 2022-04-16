const knex = require('../../../database/knex/database');

module.exports.joinSales = (condition) => {
	return knex('users as u')
		.select('u.username', 's.package_name', 's.quantity', 's.sale_date', 's.attachment')
		.innerJoin('sales as s', 'u.id', 's.user_id')
		.where(condition);
};

/**
 * Sample transaction for multiple query in one time
 */
module.exports.sampleTransaction = (data) => {
	return knex.transaction(async (trx) => {
		let insertId = await trx('users').returning('id').insert(data);

		await trx('users').returning('id').update({ username: 'updated' }).where({ id: insertId[0] });

		return insertId;
	});
};
