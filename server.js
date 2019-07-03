const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user');
const productionRouter = require('./routes/production');

const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/gw-test',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRouter);
app.use('/api/production', productionRouter);

// Plukker opp alle next(err);
app.use((err, req, res, next) => {
  console.log('\x1b[31m%s\x1b[0m', `ERROR: ${err.message}`);
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err);
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.',
    port,
    port
  );
});
