import React from 'react';

interface ChannelProps {
  channel: {
    avatar: string;
    channelName: string;
    channelHandle: string;
    totalSubscribers: string;
    totalVideos: string;
    backgroundImageUrl: string | null;
    _id: string;
  };
}

const Channel: React.FC<ChannelProps> = ({ channel }) => {
  return (
    <div key={channel._id}>
      <p>Channel Name: {channel.channelName}</p>
      <p>Subscribers: {channel.totalSubscribers}</p>

    </div>
  );
};

export default Channel;
