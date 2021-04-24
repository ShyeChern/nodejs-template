const userModel = require('./userModel');
const { validateAddUser } = require('./userValidator');
const { signToken } = require('../../util/jwt');
const { encrypt, decrypt } = require('../../util/password');
const { fileStorage, imageFilter } = require('../../util/uploads');
const fs = require('fs');
const multer = require('multer')

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await userModel.selectOne({ username });

    if (user === undefined) {
      throw new AppError(AppError.INVALID_CREDENTIALS, 401);
    }

    let passwordMatch = await decrypt(password, user.password);

    if (!passwordMatch) {
      throw new AppError(AppError.INVALID_CREDENTIALS, 401);
    }

    delete user.password;

    user.token = signToken({ user: user.id });
    res.send({ message: 'Login successfully', data: user });

  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    } else {
      return next(new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true));
    }
  }
}

module.exports.add = async (req, res, next) => {
  var storage = fileStorage('profile/');
  // store one file in uploads/profile with image filter and 2mb file size
  var upload = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 2000000 } });
  var uploads = upload.fields([{ name: 'profileImage', maxCount: 1 }]);
  uploads(req, res, async (err) => {
    try {
      validateAddUser(req.body);
      if (err) {
        throw new AppError(AppError.INVALID_IMAGE);
      }
      let { username, password } = req.body;
      let user = await userModel.selectOne({ username });

      if (user !== undefined) {
        throw new AppError(AppError.USERNAME_EXIST);
      }

      let profileImage = null;
      if (req.files.profileImage !== undefined) {
        profileImage = req.files.profileImage[0].destination + req.files.profileImage[0].filename;
      }

      password = await encrypt(password);
      let insertId = await userModel.insert({
        username,
        password,
        profile_image: profileImage
      });

      // can do something with the insert id

      res.send({ message: 'Add user successfully' });

    } catch (err) {
      if (err instanceof AppError) {
        return next(err);
      } else {
        return next(new AppError(AppError.INTERNAL_SERVER_ERROR, 500, true));
      }
    }
  })
}