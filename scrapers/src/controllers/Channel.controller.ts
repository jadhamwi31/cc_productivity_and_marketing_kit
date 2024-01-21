import { Request, Response } from 'express';
import VideoModel from '../models/Video.model';
import STATUS_CODES from 'http-status-codes';
import channelVideos from '../services/ChannelVideos';

const scrapeVideos = async (req: Request<{ channel: string }, {}, {}>, res: Response) => {
  try {
    const username = req.user.username;
    const { channel } = req.params;
    const videoDetails = await channelVideos(channel);

    let existingRecord = await VideoModel.findOne({ username, channel });

    if (existingRecord) {
      existingRecord.videos = videoDetails;
      existingRecord = await existingRecord.save();
    } else {
      const newRecord = new VideoModel({
        username,
        channel,
        videos: videoDetails,
      });
      existingRecord = await newRecord.save();
    }

    res.status(STATUS_CODES.OK).json(existingRecord);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const getChannelVideos = async (req: Request<{ channel: string }, {}, {}>, res: Response) => {
  try {
    const username = req.user.username;
    const { channel } = req.params;

    let existingRecord = await VideoModel.findOne({ username, channel });

    if (existingRecord) {
      res.status(STATUS_CODES.OK).json(existingRecord);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: 'not found' });
    }
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const ChannelController = { scrapeVideos, getChannelVideos };
