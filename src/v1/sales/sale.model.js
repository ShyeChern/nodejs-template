const knex = require('../../../database/database');

// await salesModel.sampleRawQuery([1, '2021-02-02'])
module.exports.sampleRawQuery = (bindings) => {
	return knex.raw('SELECT * FROM sales WHERE quantity > ? AND sale_date > ?', bindings);
};
