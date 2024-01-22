import mongoose, { Document, Schema } from 'mongoose';

export interface Video {
  href: string;
  thumbnailUrl: string;
  title: string;
  views: string;
  date: string;
  duration: string;
}

export interface UserDocument extends Document {
  username: string;
  channel: string;
  banner: string;
  avatar: string;
  count: string;
  videos: Video[];
}

const videoSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: false,
  },
  channel: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
  },
  avatar: {
    type: String,
  },
  count: {
    type: String,
    required: true,
  },
  videos: {
    type: [
      {
        href: String,
        thumbnailUrl: String,
        title: String,
        views: String,
        date: String,
        duration: String,
      },
    ],
  },
});

const VideoModel = mongoose.model<UserDocument>('Videos', videoSchema);

export default VideoModel;
