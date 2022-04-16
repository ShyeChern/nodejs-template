'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		await queryInterface.bulkInsert('products', [
			{ name: 'Product A', created_at: new Date(), updated_at: new Date() },
			{ name: 'Product B', created_at: new Date(), updated_at: new Date() },
			{ name: 'Product C', created_at: new Date(), updated_at: new Date() },
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('products', {
			[Sequelize.Op.or]: [{ name: 'Product A' }, { name: 'Product B' }, { name: 'Product C' }],
		});
	},
};
