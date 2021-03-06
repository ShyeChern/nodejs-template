exports.up = function (knex) {
	return knex.schema.createTable('users', function (table) {
		table.increments('id');
		table.string('email', 255).unique().notNullable();
		table.string('username', 255).notNullable();
		table.string('password', 255).notNullable();
		table.string('profile_image', 255);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('users');
};
