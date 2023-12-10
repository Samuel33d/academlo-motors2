import { AppError } from './appError.js';
import { envs } from '../../config/enviroments/enviroments.js';

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 🧨', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

const handleCastError23505 = () =>
  new AppError('Email already exist. Please enter another', 400);

const handleCastError22P02 = () =>
  new AppError('Invalid data type in database', 400);

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (envs.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (envs.NODE_ENV === 'production') {
    let error = err;

    if (err.parent?.code === '23505') error = handleCastError23505();

    if (err.parent?.code === '22P02') error = handleCastError22P02();

    sendErrorProd(error, res);
  }
};
