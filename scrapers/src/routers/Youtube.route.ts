import { Router } from 'express';
import { YoutubeController } from '../controllers/Youtube.controller';
import { UserController } from '../controllers/User.controller';
import { ChannelController } from '../controllers/Channel.controller';
import { VideoController } from '../controllers/Video.controller';
import { ReportController } from '../controllers/Report.controller';
import { TrendsController } from '../controllers/Trends.controller';
export const YoutubeRouter = Router();

YoutubeRouter.post('/channel', YoutubeController.channelInfo);
YoutubeRouter.post('/videos', YoutubeController.channelVideos);
YoutubeRouter.post('/comments', YoutubeController.videoComments);

YoutubeRouter.post('/addChannel', UserController.addChannel);
YoutubeRouter.get('/myChannels', UserController.getChannel);
YoutubeRouter.delete('/deleteChannel', UserController.deleteChannel);

YoutubeRouter.get('/videos/:channel', ChannelController.scrapeVideos);
YoutubeRouter.get('/getChannelVideos/:channel', ChannelController.getChannelVideos);

YoutubeRouter.post('/getComments', VideoController.scrapeVideoComments);

YoutubeRouter.get('/report/:channelId', ReportController.getChannelReport);

YoutubeRouter.post('/trends/', TrendsController.getTrends);
