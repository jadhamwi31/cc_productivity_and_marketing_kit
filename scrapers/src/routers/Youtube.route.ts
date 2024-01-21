import { Router } from 'express';
import { YoutubeController } from '../controllers/Youtube.controller';
import { UserController } from '../controllers/User.controller';
export const YoutubeRouter = Router();

YoutubeRouter.post('/channel', YoutubeController.channelInfo);
YoutubeRouter.post('/videos', YoutubeController.channelVideos);
YoutubeRouter.post('/comments', YoutubeController.videoComments);
YoutubeRouter.post('/addChannel', UserController.addChannel);
YoutubeRouter.get('/myChannels', UserController.getChannel);
