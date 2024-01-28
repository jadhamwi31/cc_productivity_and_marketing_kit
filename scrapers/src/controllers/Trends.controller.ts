import { Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import Trends from '../services/Trends';

const getTrends = async (req: Request<{}, {}, { geo: string; cat: string }>, res: Response) => {
  try {
    const { geo, cat } = req.body;

    try {
      const data = await Trends(geo, cat);

      return res.status(STATUS_CODES.OK).json(data);
    } catch (e) {
      console.error(e);
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ status: STATUS_CODES.BAD_REQUEST, message: 'Invalid data structure' });
    }
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

export const TrendsController = { getTrends };
