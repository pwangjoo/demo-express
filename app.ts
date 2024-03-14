/**
 * Basic imports.
 */
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import 'express-async-errors';

const app = express();
const { MODE, DEBUG, PORT } = process.env;

if (MODE === 'development') app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routers.
 */
import indexRouter from './routes/v2/index';
import usersRouter from './routes/v2/users';
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(async (_req: Request, _res: Response, next: NextFunction)=> {
  next(createError(404));
});

/**
 * Error handler.
 */
app.use(async (err: any, req: Request, res: Response, _next: NextFunction)=> {
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


/**
 * Init server.
 */
app.listen(PORT, ()=> {
  if (MODE === 'production') {
    console.log(`   [ALERT] SERVER BOOTED: ${new Date().toString()}`);
  };
});