const uploadController = require('../src/v1/uploads/upload.controller');

const getReturnValue = jest.fn((data) => {
	return data;
});

describe('Upload Controller', function () {
	describe('Download file', function () {
		test('should return download file if data valid', async function () {
			const req = {
				params: { folder: 'attachment', file: '1.pdf' },
			};
			const res = {
				download: getReturnValue,
			};

			await uploadController.downloadFile(req, res, getReturnValue);

			const [{ value }] = getReturnValue.mock.results;
			expect(value).toMatch(/.\/uploads\//);
		});
	});
});
