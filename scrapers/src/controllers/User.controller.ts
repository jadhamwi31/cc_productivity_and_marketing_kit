import { Request, Response } from 'express';
import ChannelModel, { Channel } from '../models/Channel.model';
import VideoModel from '../models/Video.model';
import STATUS_CODES from 'http-status-codes';
import channelInfo from '../services/ChannelInfo';

const addChannel = async (req: Request<{}, {}, { url: string }>, res: Response) => {
  try {
    const { url } = req.body;
    const username = req.user.username;

    try {
      const data = await channelInfo(url);

      if (typeof data !== 'string') {
        let user = await ChannelModel.findOne({ username });

        if (!user) {
          user = await ChannelModel.create({ username, channels: [] });
        }

        const channelData: Channel = {
          avatar: data.avatar,
          channelName: data.channelName,
          channelHandle: data.channelHandle,
          totalSubscribers: data.totalSubscribers,
          totalVideos: data.totalVideos,
          backgroundImageUrl: data.backgroundImageUrl,
        };
        const existingChannelIndex = user.channels.findIndex(
          (channel) => channel.channelHandle === channelData.channelHandle,
        );

        if (existingChannelIndex !== -1) {
          user.channels[existingChannelIndex] = channelData;
        } else {
          user.channels.push(channelData);

          const newRecord = new VideoModel({
            username,
            channel: data.channelHandle,
            videos: [],
          });
          await newRecord.save();
        }
        const updatedUser = await user.save();

        return res
          .status(STATUS_CODES.OK)
          .json({ status: STATUS_CODES.OK, message: updatedUser.channels });
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ status: STATUS_CODES.BAD_REQUEST, message: 'Invalid data structure' });
      }
    } catch (e) {
      console.error(e);
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const getChannel = async (req: Request<{}, {}, { url: string }>, res: Response) => {
  const username = req.user.username;
  try {
    let user = await ChannelModel.find({ username });
    return res.status(STATUS_CODES.OK).json({ data: user });
  } catch (e) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ error: e });
  }
};

export const UserController = { addChannel, getChannel };
