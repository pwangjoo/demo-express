/**
 * Basic imports.
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import 'express-async-errors';

const app = express();
const { MODE, DEBUG } = process.env;

if (MODE === 'development') app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routers.
 */
import indexRouter from './routes/index';
import usersRouter from './routes/users';
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(async (req, res, next)=> {
  next(createError(404));
});

/**
 * Error handler.
 */
app.use(async (err, req, res, next)=> {
  // development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // production
  if (!DEBUG) {
    console.log(err);
    if (MODE === 'production') {
      // your code
    };
  };
  res.sendStatus(err.status || 500);
});

module.exports = app;
