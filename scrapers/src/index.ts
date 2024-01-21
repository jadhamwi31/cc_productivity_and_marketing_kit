import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { YoutubeRouter } from './routers/Youtube.route';
import { AuthMiddleware } from './middlewares/Auth.middleware';
import cookieParser from 'cookie-parser';

dotenv.config();

(async function () {
  const app: Application = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(AuthMiddleware);

  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use('/youtube', YoutubeRouter);

  const PORT: number = parseInt(process.env.PORT || '8082', 10);

  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect('mongodb://localhost:27017/scrapperDb');
    app.listen(PORT, () => {
      console.log(`Connected on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(error);
  }
})();
