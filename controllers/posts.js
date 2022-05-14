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
    const { content, image, user, createdAt } = req.body;
    if (content === '' || user === '') {
      return appError(400, '欄位資料填寫不全', next);
    } else {
      const newPost = await Post.create({
        content,
        image,
        user,
        createdAt,
      });
      handleSuccess(res, '新增成功', newPost);
    }
  }),
  deletePosts: handleErrorAsync(async (req, res) => {
    const posts = await Post.deleteMany({});
    handleSuccess(res, '刪除成功', posts);
  }),
  deleteOnePost: handleErrorAsync(async (req, res, next) => {
    const id = req.params.id;
    if (id === null) {
      return appError(400, '查無此 ID', next);
    }
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) {
      return appError(400, '查無此 ID', next);
    } else {
      const posts = await Post.find();
      handleSuccess(res, '刪除成功', posts);
    }
  }),
  editPost: handleErrorAsync(async (req, res, next) => {
    const { content, image, likes, user } = req.body;
    const id = req.params.id;
    if (!content) {
      return appError(400, 'content 必填', next);
    } else {
      const editPost = await Post.findByIdAndUpdate(
        id,
        {
          content,
          image,
          likes,
          user,
        },
        { new: true }
      );
      if (!editPost) {
        return appError(400, '更新失敗, 查無此 id 或資料錯誤', next);
      } else {
        const posts = await Post.find().populate({
          path: 'user',
          select: 'name photo ',
        });
        handleSuccess(res, '編輯成功', posts);
      }
    }
  }),
};

module.exports = posts;
