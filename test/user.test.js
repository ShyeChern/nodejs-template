const knex = require('../database/database');
const userController = require('../src/v1/users/user.controller');
const { UserError } = require('../src/util/error');

const getReturnValue = jest.fn((data) => {
	return data;
});

describe('User Controller', function () {
	beforeAll(function () {
		process.env.JWT_SECRET = 'testingSecret';
	});

	afterEach(function () {
		getReturnValue.mockClear();
	});

	afterAll(function () {
		knex.destroy();
	});

	describe('login', function () {
		test('should return error when invalid credential', async function () {
			const req = {
				body: { username: 'abc', password: '123' },
			};

			await userController.login(req, {}, getReturnValue);

			const [{ value }] = getReturnValue.mock.results; // array index 0 and destruct to get returned value

			expect(value).toStrictEqual(new UserError(UserError.INVALID_CREDENTIALS));
			expect(value.statusCode).toBe(401);
		});

		test('should return user data when login successful', async function () {
			const req = {
				body: { username: 'alex', password: 'admin' },
			};
			const res = {
				send: getReturnValue,
				cookie: jest.fn(),
			};

			await userController.login(req, res, getReturnValue);

			const [{ value }] = getReturnValue.mock.results;
			expect(value.data).toMatchObject({ id: expect.any(Number) });
			expect(value.data).toHaveProperty('token');
		});
	});
});
