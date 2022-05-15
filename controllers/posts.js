const Post = require('../models/posts');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const handleSuccess = require('../service/handleSuccess');

const posts = {
  getPosts: handleErrorAsync(async (req, res) => {
    const { keyword, sortby } = req.query;
    const search =
      keyword !== undefined ? { content: new RegExp(`${keyword}`) } : {};
    const sort = sortby === 'asc' ? 'createdAt' : '-createdAt';
    const posts = await Post.find(search)
      .populate({
        path: 'user',
        select: 'name photo ',
      })
      .sort(sort);
    handleSuccess(res, '取得資料', posts);
  }),
  createPost: handleErrorAsync(async (req, res, next) => {
    const { content, image, createdAt } = req.body;
    if (content === '') {
      return appError(400, '欄位資料填寫不全', next);
    } else {
      const newPost = await Post.create({
        content,
        image,
        user: req.user.id,
        createdAt,
      });
      handleSuccess(res, '新增成功', newPost);
    }
  }),
};

module.exports = posts;
