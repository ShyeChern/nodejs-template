const knex = require('../../database/knex/database');

/**
 * General and Reusable Model
 */
module.exports = class Model {
	constructor(table) {
		this.table = table;
	}

	selectOne(condition, column = '*') {
		return knex(this.table).select(column).where(condition).first();
	}

	selectLimitOffset(condition, limit, offset, column = '*') {
		return knex(this.table).select(column).where(condition).limit(limit).offset(offset);
	}

	insert(data) {
		return knex(this.table).returning('id').insert(data);
	}

	update(data, condition) {
		return knex(this.table).update(data).where(condition);
	}

	delete(condition) {
		return knex(this.table).delete().where(condition);
	}

	count(condition, column = '*') {
		return knex(this.table).count(column).where(condition).first();
	}
};
