const knex = require('../database/database');
const saleController = require('../src/v1/sales/sale.controller');

const getReturnValue = jest.fn((data) => {
	console.log(data);
	return data;
});

describe('Sale Controller', function () {
	afterEach(function () {
		getReturnValue.mockClear();
	});

	afterAll(function () {
		knex.destroy();
	});

	describe('Insert new sale', function () {
		test.skip('should insert the correct data into database', async function () {
			const req = {
				body: { userId: 2, packageName: 'Red', quantity: 33, saleDate: '2001-12-12' },
				files: {
					attachment: null,
				},
				headers: { 'transfer-encoding': 'chunked' },
			};
			const res = {
				send: getReturnValue,
			};
			const saleValidator = require('../src/v1/sales/sale.validator');
			saleValidator.validateAddSale = jest.fn().mockReturnValue(true);

			/**
			 * Problem 1
			 * class in sale controller cannot be mocked because it was initialize at start
			 * need to be in the function scope
			 * 
			 * Problem 2
			 * After insert cannot get res.send returned result, but can be console.log in function
			 */
			const mockInsert = jest.fn().mockResolvedValue(1);
			jest.mock('../src/util/generalModel', () => {
				return jest.fn().mockImplementation(() => {
					return {
						insert: mockInsert,
					};
				});
			});

			await saleController.addSale(req, res, getReturnValue);
			// const [{ value }] = getReturnValue.mock.results;
			console.log(getReturnValue.mock.results);
			saleValidator.validateAddSale.mockClear();
			mockInsert.mockClear();
		});
	});
});
