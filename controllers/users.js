const User = require('../models/users');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const handleSuccess = require('../service/handleSuccess');

const users = {
  getUser: handleErrorAsync(async (req, res) => {
    const users = await User.find();
    handleSuccess(res, '取得使用者資料', users);
  }),
  creatUser: handleErrorAsync(async (req, res, next) => {
    const { name, email, password, photo } = req.body;
    if (!name || !email || !password) {
      return appError(400, '欄位資料填寫不全', next);
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
        photo,
      });
      handleSuccess(res, '新增使用者', newUser);
    }
  }),
  editUser: handleErrorAsync(async (req, res) => {
    const { name, email, password, photo } = req.body;
    const id = req.params.id;
    if (!name || !password) {
      return appError(400, '欄位資料填寫不全', next);
    } else {
      const editUser = await Post.findByIdAndUpdate(
        id,
        {
          name,
          email,
          password,
          photo,
        },
        { new: true }
      );
      if (!editUser) {
        return appError(400, '編輯失敗', next);
      } else {
        const users = await User.find();
        handleSuccess(res, '編輯使用者', users);
      }
    }
  }),
};

module.exports = users;
