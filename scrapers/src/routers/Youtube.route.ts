import { Router } from 'express';
import { YoutubeController } from '../controllers/Youtube.controller';
export const YoutubeRouter = Router();

YoutubeRouter.post('/channel', YoutubeController.channelInfo);
YoutubeRouter.post('/videos', YoutubeController.channelInfo);
