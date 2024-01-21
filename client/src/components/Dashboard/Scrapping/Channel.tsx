import React from 'react';
import { IoSync, IoClose } from 'react-icons/io5';
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
    <div key={channel._id} className='rounded-lg border-2 border-New_Gray  '>
      <div className='relative mb-14'>
        <img
          src={
            channel.backgroundImageUrl
              ? channel.backgroundImageUrl
              : 'https://placehold.co/100x100?text=Channel+Banner'
          }
          alt='Background'
          className='absolute h-32 rounded-t-lg z-10 w-full object-cover'
        />
        <img
          src={
            channel.backgroundImageUrl
              ? channel.backgroundImageUrl
              : 'https://placehold.co/100x100?text=Channel+Banner'
          }
          alt='Background'
          className='h-32 rounded-t-lg blur-md object-cover w-full'
        />
        <img
          src={channel.avatar}
          alt='Avatar'
          className='rounded-full object-cover w-28 absolute z-20 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'
        />
      </div>
      <div className='p-2 flex justify-between'>
        <div>
          <p>
            <span className='text-zinc-700 mr-2 '>Channel Name :</span>
            {channel.channelName}
          </p>
          <p>
            <span className='text-zinc-700  mr-2 '>Subscribers :</span>
            {channel.totalSubscribers}
          </p>
          <p>
            <span className='text-zinc-700  mr-2 '>Videos :</span>
            {channel.totalVideos}
          </p>
        </div>
        <div className='flex items-end'>
          <button>
            <IoSync size={20} className='hover:text-blue-500' />
          </button>
          <button>
            <IoClose size={20} className='hover:text-red-500' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
