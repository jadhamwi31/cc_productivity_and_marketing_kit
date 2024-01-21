import mongoose, { Document, Schema } from 'mongoose';

export interface Channel {
  avatar: string;
  channelName: string;
  channelHandle: string;
  totalSubscribers: string;
  totalVideos: string;
  backgroundImageUrl: string | null;
}

interface UserDocument extends Document {
  username: string;
  channels: Channel[];
}

const channelSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
  },
  channels: {
    type: [
      {
        avatar: String,
        channelName: String,
        channelHandle: String,
        totalSubscribers: String,
        totalVideos: String,
        backgroundImageUrl: String,
      },
    ],
  },
});

const ChannelModel = mongoose.model<UserDocument>('Channels', channelSchema);

export default ChannelModel;
