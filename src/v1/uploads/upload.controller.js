const fs = require('fs');
const { PassThrough } = require('stream');
const XLSX = require('xlsx');
const Excel = require('exceljs');
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

module.exports.styleExcel = async (req, res, next) => {
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

			// read
			const path = `./uploads/temp/${req.files.csv[0].filename}`;
			const workbook = new Excel.Workbook();
			await workbook.xlsx.readFile(path);
			const data = [];
			workbook.eachSheet((sheet, id) => {
				const temp = [];
				sheet.eachRow((row, rowNo) => {
					if (rowNo == 1) return;
					temp.push(row.values.slice(1));
				});
				data.push({ sheetName: sheet.name, data: temp });
			});
			// delete file in temp
			fs.unlinkSync(path);

			// write
			const output = new Excel.Workbook();
			const sheet = output.addWorksheet('Sheet Name 1');
			sheet.columns = [
				{
					header: 'Head 1',
					key: 'head1',
					width: 50,
					style: {
						font: { bold: true, color: { argb: 'FFFFFF' } },
						fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F08080' } },
					},
				},
				{ header: 'Head 2', key: 'head2', width: 30 },
				{ header: 'Head 3', key: 'head3', width: 20 },
			];
			sheet.addRow(['q', 'q', 'q']);
			sheet.addRows([
				{ head1: 'h1', head2: 'h2', head3: 'h3' },
				{ head1: 'h1', head2: 'h2', head3: 'h3' },
			]);

			sheet.getRow(2).fill = {
				type: 'pattern',
				pattern: 'darkTrellis',
				fgColor: { argb: 'FFFFFF00' },
				bgColor: { argb: 'FF0000FF' },
			};

			sheet.getCell('B3').border = {
				top: { style: 'double', color: { argb: 'FF00FF00' } },
				left: { style: 'double', color: { argb: 'FF00FF00' } },
				bottom: { style: 'double', color: { argb: 'FF00FF00' } },
				right: { style: 'double', color: { argb: 'FF00FF00' } },
			};
			sheet.getCell('B3').style = {
				...sheet.getCell('B3').style,
				font: {
					size: 15,
				},
			};

			res.set({
				'Content-Disposition': 'attachment; filename = styleExcel.xlsx',
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});
			// convert buffer to stream without creating new file
			const readStream = new PassThrough();
			readStream.end(await output.xlsx.writeBuffer());
			readStream.pipe(res);
		} catch (err) {
			return next(err);
		}
	});
};
