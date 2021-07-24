const assert = require('assert');

describe('Sample Hooks', function () {
	beforeAll(function () {
		// runs once before the first test in this block
	});

	afterAll(function () {
		// runs once after the last test in this block
	});

	beforeEach(function () {
		// runs before each test in this block
	});

	afterEach(function () {
		// runs after each test in this block
	});

	test('Sample Test 1', function () {
		expect([1, 2, 3]).toContain(3);
	});

	// Auto set to test
	if (process.env.NODE_ENV === 'test') {
		test.skip('Sample Test 2 (Skipped)', function () {
			assert.notStrictEqual([1, 2, 3].indexOf(4), '-1');
		});
	}

	test('Sample Test 3', function () {
		expect([1, 2, 3].length).not.toBe(2);
	});
});
