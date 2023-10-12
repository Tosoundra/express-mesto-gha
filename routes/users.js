const userRouter = require('express').Router();
const {
  createUser,
  getUser,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.patch('/me/:id', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
