import { Request, Response } from 'express';
import VideoModel from '../models/Video.model';
import STATUS_CODES from 'http-status-codes';
import channelVideos from '../services/ChannelVideos';

const getVideos = async (req: Request<{ channel: string }, {}, {}>, res: Response) => {
  try {
    const username = req.user.username;
    const { channel } = req.params;
    const videoDetails = await channelVideos(channel);
    const userData: any = {
      username,
      channel,
      videos: videoDetails,
    };
    const savedData = await VideoModel.create(userData);
    res.status(STATUS_CODES.OK).json(savedData);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

export const ChannelController = { getVideos };
