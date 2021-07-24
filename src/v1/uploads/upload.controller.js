const fs = require('fs');
const { PassThrough } = require('stream');
const XLSX = require('xlsx');
const multer = require('multer');
const { UserError } = require('../../util/error');
const { fileStorage, csvFilter } = require('../../util/uploads');

module.exports.viewFile = async (req, res, next) => {
	try {
		let { folder, file } = req.params;
		let path = `./uploads/${folder}/${file}`;
		if (!fs.existsSync(path)) {
			throw new UserError(UserError.FILE_NOT_EXIST, 404);
		}
		/**
		 * To view attachment instead of download
		 * @ res.attachment -- to set attachment's Content-Type by giving file path
		 * @ Content-Disposition: inline -- to show the attachment instead of download
		 * @ filename = file -- file default name (can be customize according to your preference)
		 */
		res.attachment(path);
		res.set({
			'Content-Disposition': 'inline; filename =' + file,
		});
		/**
		 * createReadStream and pipe stream the attachment data chunk by chunk instead of load all at once
		 * best approach for big attachment
		 */
		fs.createReadStream(path).pipe(res);
	} catch (err) {
		return next(err);
	}
};

module.exports.downloadFile = async (req, res, next) => {
	try {
		let { folder, file } = req.params;
		let path = `./uploads/${folder}/${file}`;
		if (!fs.existsSync(path)) {
			throw new UserError(UserError.FILE_NOT_EXIST, 404);
		}
		res.download(path);
	} catch (err) {
		return next(err);
	}
};

module.exports.readExcel = async (req, res, next) => {
	const storage = fileStorage('temp/');
	const upload = multer({
		storage: storage,
		fileFilter: csvFilter,
	});
	const uploads = upload.fields([{ name: 'csv', maxCount: 1 }]);
	uploads(req, res, async (err) => {
		try {
			if (err) {
				throw new UserError(UserError.INVALID_CSV);
			}

			const path = `./uploads/temp/${req.files.csv[0].filename}`;
			const csv = XLSX.readFile(path);
			const data = [];
			for (const sheet in csv.Sheets) {
				data.push({
					sheetName: sheet,
					data: XLSX.utils.sheet_to_json(csv.Sheets[sheet]),
				});
			}
			// delete file in temp
			fs.unlinkSync(path);

			res.send({ data });
		} catch (err) {
			return next(err);
		}
	});
};

module.exports.writeExcel = async (req, res, next) => {
	try {
		const data = [
			{ name: 'alex', age: 23 },
			{ name: 'bob', age: 22 },
			{ name: 'cait', age: 20 },
		];
		const workbook = XLSX.utils.book_new();
		const sheet = XLSX.utils.json_to_sheet(data);
		XLSX.utils.book_append_sheet(workbook, sheet, 'SheetName');
		res.set({
			'Content-Disposition': 'attachment; filename = writeFile.xlsx',
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});
		// convert buffer to stream without creating new file
		const readStream = new PassThrough();
		readStream.end(XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }));
		readStream.pipe(res);
	} catch (err) {
		return next(err);
	}
};
