const { DataTypes } = require('sequelize');
const { conn } = require('../../../database/sequelize/database');

const Product = conn.define(
	'product',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		// Other model options go here
		tableName: 'products',
		paranoid: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',
		indexes: [
			{
				fields: ['name'],
			},
		],
	}
);
Product.sync();
module.exports = {
	Product,
};
