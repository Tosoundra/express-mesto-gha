const { Error } = require('mongoose');
const { getUserError } = require('../Errors/GetQueryError');
const { userValidationError } = require('../Errors/ValidationError');
const { UserModel } = require('../models/user');
const { serverError } = require('../Errors/InternalServerError');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  UserModel.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        res
          .status(userValidationError.statusCode)
          .send({ message: userValidationError.message });
        return;
      }
      if (err instanceof SyntaxError) {
        res
          .statusCode(serverError.statusCode)
          .send({ message: serverError.message });
      }
    });
};

module.exports.getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(getUserError.statusCode)
        .send({ message: getUserError.message });
    });
};

module.exports.getUser = (req, res) => {
  UserModel.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res
        .status(getUserError.statusCode)
        .send({ message: getUserError.message });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  UserModel.findByIdAndUpdate(
    req.params.id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        res
          .status(userValidationError.statusCode)
          .send({ message: userValidationError.message });
        return;
      }
      if (err instanceof Error.CastError) {
        res
          .status(getUserError.statusCode)
          .send({ message: getUserError.message });
      }
    })
    .catch((err) => res.send(err.name));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  UserModel.findByIdAndUpdate(
    req.params.id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        res
          .status(userValidationError.statusCode)
          .send({ message: userValidationError.message });
        return;
      }
      if (err instanceof Error.CastError) {
        res
          .status(getUserError.statusCode)
          .send({ message: getUserError.message });
      }
    })
    .catch((err) => res.send(err.name));
};
