const GeneralModel = require('../../models/generalModel');
const saleGeneralModel = new GeneralModel('sales');
const salesModel = require('./sale.model');
const saleValidator = require('./sale.validator');
const { fileStorage, attachmentFilter } = require('../../util/uploads');
const constants = require('../../util/constants');
const { UserError } = require('../../util/error');
const multer = require('multer');

module.exports.getSale = async (req, res, next) => {
	try {
		let { page, packageName } = req.query;
		if (!page) {
			page = 0;
		}
		const limit = 10;
		const offset = Math.max(0, (page - 1) * 10);
		let condition = {};

		if (packageName) {
			condition.package_name = packageName;
		}

		let row = saleGeneralModel.selectLimitOffset(condition, limit, offset, [
			'id',
			'user_id as userId',
			'package_name as packageName',
			'quantity',
			'sale_date as saleDate',
			'attachment',
		]);

		// count id as total
		let totalRow = saleGeneralModel.count(condition, { total: 'id' });

		// await all at once
		[row, totalRow] = await Promise.all([row, totalRow]);
		
		totalRow = totalRow.total;

		for (let value of row) {
			if (value.attachment !== null) {
				value.attachment = `${constants.API_V1_VIEW}${value.attachment}`;
			}
		}

		let returnData = { row, totalRow, totalPage: Math.ceil(totalRow / 10) };
		res.send({ message: 'Get sales data successfully', data: returnData });
	} catch (err) {
		return next(err);
	}
};

module.exports.addSale = async (req, res, next) => {
	const storage = fileStorage('attachment/');
	const upload = multer({
		storage: storage,
		fileFilter: attachmentFilter,
		limits: { fileSize: 5000000 },
	});
	const uploads = upload.fields([{ name: 'attachment', maxCount: 1 }]);

	uploads(req, res, async (err) => {
		try {
			if (err) {
				throw new UserError(UserError.INVALID_ATTACHMENT);
			}
			await saleValidator.validateAddSale(req.body);

			let attachment = null;
			if (req.files.attachment) {
				attachment = `attachment/${req.files.attachment[0].filename}`;
			}

			let insertId = await saleGeneralModel.insert({
				user_id: req.body.userId,
				package_name: req.body.packageName,
				quantity: req.body.quantity,
				sale_date: req.body.saleDate,
				attachment,
			});

			// do something with the insert id

			res.send({ message: 'Add sale successfully' });
		} catch (err) {
			return next(err);
		}
	});
};

module.exports.updateSale = async (req, res, next) => {
	const storage = fileStorage('attachment/');
	const upload = multer({
		storage: storage,
		fileFilter: attachmentFilter,
		limits: { fileSize: 5000000 },
	});
	const uploads = upload.fields([{ name: 'attachment', maxCount: 1 }]);

	uploads(req, res, async (err) => {
		try {
			let userInput = {
				id: req.params.id,
				userId: req.body.userId,
				packageName: req.body.packageName,
				quantity: req.body.quantity,
				saleDate: req.body.saleDate,
			};
			await saleValidator.validateUpdateSale(userInput);
			if (err) {
				throw new UserError(UserError.INVALID_ATTACHMENT);
			}

			let updateData = {
				user_id: userInput.userId,
				package_name: userInput.packageName,
				quantity: userInput.quantity,
				sale_date: userInput.saleDate,
			};
			if (req.files.attachment) {
				updateData.attachment = `attachment/${req.files.attachment[0].filename}`;
			}

			await saleGeneralModel.update(updateData, { id: userInput.id });

			res.send({ message: 'Update sale successfully' });
		} catch (err) {
			return next(err);
		}
	});
};

module.exports.deleteSale = async (req, res, next) => {
	try {
		let userInput = {
			id: req.params.id,
		};

		await saleValidator.validateDeleteSale(userInput);

		await saleGeneralModel.delete({ id: userInput.id });

		res.send({ message: 'Delete sale successfully' });
	} catch (err) {
		return next(err);
	}
};
