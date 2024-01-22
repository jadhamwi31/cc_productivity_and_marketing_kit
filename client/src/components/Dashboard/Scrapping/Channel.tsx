import { IoSync } from 'react-icons/io5';
import DeleteChannel from './DeleteChannel';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  const RefreshChannel = async (id: string) => {
    setIsLoading(true);
    const response = await fetch('/youtube/addChannel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({
        url: `https://www.youtube.com/${id}`,
      }),
    });
    setIsLoading(false);
    const json = await response.json();
    if (response.ok) {
      toast.success('Channel Refreshed Successfully');
      mutate('/youtube/myChannels');
    } else {
      toast.error('try again ');
    }
  };

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
          src={channel.avatar ? channel.avatar : 'https://placehold.co/100x100?text=Avatar'}
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
            <span className='text-zinc-700 mr-2 '>Username</span>
            {channel.channelHandle}
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
          <button
            disabled={isLoading}
            className='disabled:text-New_Gray disabled:cursor-not-allowed'
            onClick={() => {
              RefreshChannel(channel.channelHandle);
            }}
          >
            <IoSync size={20} className='hover:text-blue-500 mb-2' />
          </button>
          <DeleteChannel id={channel.channelHandle} />
        </div>
      </div>
    </div>
  );
};

export default Channel;
