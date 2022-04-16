exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				{
					id: 1,
					email: 'alex@domain.com',
					username: 'alex',
					password:
						'$2b$10$xk/8Z/y9o/zNihqLGGUObOPzqXzR0ADGIqTexMhNgKcDPgLBjjmnG',
					profile_image: null,
				},
				{
					id: 2,
					email: 'bob@domain.com',
					username: 'bob',
					password:
						'$2b$10$xk/8Z/y9o/zNihqLGGUObOPzqXzR0ADGIqTexMhNgKcDPgLBjjmnG',
					profile_image: null,
				},
				{
					id: 3,
					email: 'cait@domain.com',
					username: 'cait',
					password:
						'$2b$10$xk/8Z/y9o/zNihqLGGUObOPzqXzR0ADGIqTexMhNgKcDPgLBjjmnG',
					profile_image: null,
				},
			]);
		});
};
