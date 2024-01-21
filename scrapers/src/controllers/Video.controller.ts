import { Request, Response } from 'express';
import VideoModel from '../models/Video.model';
import STATUS_CODES from 'http-status-codes';
import VideoComments from '../services/VideoComments';

const scrapeVideoComments = async (req: Request<{}, {}, { url: string }>, res: Response) => {
  const { url } = req.body;
  try {
    const data = await VideoComments(url);
    if (data) {
      res.status(STATUS_CODES.OK).json(data);
    }
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const VideoController = { scrapeVideoComments };
