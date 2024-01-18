import { Request, Response } from 'express';
const channleInfo = async (req: Request<{}, {}, { channelUrl: string }>, res: Response) => {
  const { channelUrl } = req.body;
  try {
  } catch (e) {}
};
export const AuthController = { channleInfo };
