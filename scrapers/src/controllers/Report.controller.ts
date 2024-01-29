import { Request, Response } from 'express';

import STATUS_CODES from 'http-status-codes';
import channelReport from '../services/ChannelReport';
const getChannelReport = async (req: Request<{ channelId: string }, {}, {}>, res: Response) => {
  const { channelId } = req.params;

  try {
    console.log('ahmad');

    const report = await channelReport(channelId);
    console.log(report);
    res.status(STATUS_CODES.OK).json(report);
  } catch (e) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to retrieve channel report.' });
  }
};

export const ReportController = { getChannelReport };
