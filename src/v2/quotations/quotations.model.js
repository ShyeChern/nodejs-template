const { DataTypes } = require('sequelize');
const { conn } = require('../../../database/sequelize/database');
const { Product } = require('../products/products.model');

const Quotation = conn.define(
	'quotation',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'products',
				key: 'id',
			},
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
	},
	{
		// Other model options go here
		paranoid: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',
	}
);
Product.hasOne(Quotation);
Quotation.belongsTo(Product, { foreignKey: 'product_id' });
Quotation.sync();
module.exports = {
	Quotation,
};
