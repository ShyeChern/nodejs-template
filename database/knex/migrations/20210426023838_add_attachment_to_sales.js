exports.up = function (knex) {
	return knex.schema.table('sales', function (table) {
		table.string('attachment', 255).defaultTo(null);
	});
};

exports.down = function (knex) {
	return knex.schema.table('sales', function (table) {
		table.dropColumn('attachment');
	});
};
