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
		await queryInterface.bulkInsert('quotations', [
			{ product_id: 1, price: 12.0, created_at: new Date(), updated_at: new Date() },
			{ product_id: 2, price: 21.0, created_at: new Date(), updated_at: new Date() },
			{ product_id: 3, price: 22.0, created_at: new Date(), updated_at: new Date() },
			{ product_id: 3, price: 44.0, created_at: new Date(), updated_at: new Date() },
			{ product_id: 2, price: 55.0, created_at: new Date(), updated_at: new Date() },
			{ product_id: 1, price: 21.0, created_at: new Date(), updated_at: new Date() },
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('quotations', {
			[Sequelize.Op.or]: [{ id: 1 }, { id: 2 }, { id: 3 }],
		});
	},
};
