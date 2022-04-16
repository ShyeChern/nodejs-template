'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		queryInterface.describeTable('products').then((table) => {
			if (table.active) {
				return Promise.resolve();
			}

			return queryInterface.addColumn('products', 'active', {
				type: Sequelize.DataTypes.BOOLEAN,
				defaultValue: true,
			});
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeColumn('products', 'active');
	},
};
