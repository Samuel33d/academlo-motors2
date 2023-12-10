import cors from 'cors';
import { AppError } from '../../commons/errors/appError.js';

export const enableCors = (app, acceptedOrigins) => {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
          return callback(null, true);
        }

        if (!origin) {
          return callback(null, true);
        }

        return callback(new AppError('Not allowed by CORS'));
      },
    })
  );
};
