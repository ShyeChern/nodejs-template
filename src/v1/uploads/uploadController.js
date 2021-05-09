const fs = require('fs')

module.exports.viewFile = async (req, res, next) => {
  try {
    let { folder, file } = req.params;
    let path = `./uploads/${folder}/${file}`;
    if (!fs.existsSync(path)) {
      throw new UserError(UserError.FILE_NOT_EXIST, 404);
    }
    /**
     * View attachment instead of download
     * @ res.attachment -- to set Content-Type
     * @ Content-Disposition: inline -- to show instead of download
     * @ filename=file -- file default name (can be customize according to your preference)
     */
    res.attachment(`./uploads/${folder}/${file}`)
    res.set({
      'Content-Disposition': 'inline; filename=' + file
    })
    fs.createReadStream(`./uploads/${folder}/${file}`).pipe(res);

  } catch (err) {
    return next(err)
  }
}

module.exports.downloadFile = async (req, res, next) => {
  try {
    let { folder, file } = req.params;
    let path = `./uploads/${folder}/${file}`;
    if (!fs.existsSync(path)) {
      throw new UserError(UserError.FILE_NOT_EXIST, 404);
    }
    res.download(path)
  } catch (err) {
    return next(err)
  }
}