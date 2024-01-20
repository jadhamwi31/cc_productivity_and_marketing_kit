import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { YoutubeRouter } from './routers/Youtube.route';

dotenv.config();

(async function () {
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors({ origin: process.env.CLIENT_URL }));
  app.use('/youtube', YoutubeRouter);

  const PORT = process.env.PORT || 8082;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
