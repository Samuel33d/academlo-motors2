import express from 'express';
import { router } from './routes/index.js';
import morgan from 'morgan';
import { AppError } from './commons/errors/appError.js';
import { globalErrorHandler } from './commons/errors/errors.controller.js';
import { envs } from './config/enviroments/enviroments.js';
import { enableCors } from './config/plugins/cors.plugin.js';
import { limitRequest } from './config/plugins/rate-limit.plugin.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (envs.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const acceptedOrigins = [];
enableCors(app, acceptedOrigins);

const rateLimit = limitRequest(3, 60, 'Too many request from this IP. Please try again in an hour');
app.use(rateLimit);

app.use('/api/v1', router);

app.use('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} in this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
