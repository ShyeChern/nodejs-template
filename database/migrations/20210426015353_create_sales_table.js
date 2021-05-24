exports.up = function (knex) {
	return knex.schema.createTable('sales', function (table) {
		table.increments('id');
		table.integer('user_id').references('id').inTable('users');
		table.string('package_name', 255).notNullable();
		table.integer('quantity').notNullable();
		table.date('sale_date').notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('sales');
};
