const app = require('express')();
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/card');
const { serverError } = require('./Errors/InternalServerError');
const { incorrectRoute } = require('./Errors/IncorrectRoute');
const db = require('./database/db');

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '65255f4764068eee1b6732cc',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((err, req, res, next) => {
  console.log(`Some error occurred ${err.stack}`);
  res.status(serverError.statusCode).send({ message: serverError.message });
});
app.use((req, res, next) => {
  res
    .status(incorrectRoute.statusCode)
    .send({ message: incorrectRoute.message });
});

app.listen(PORT);
