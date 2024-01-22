import React from 'react';

interface VidooProps {
  video: {
    href: string;
    thumbnailUrl: string;
    title: string;
    views: string;
    date: string;
    duration: string | null;
    _id: string;
  };
}

const VideoCard: React.FC<VidooProps> = ({ video }) => {
  return (
    <div className='border-2 border-New_Gray rounded-md'>
      <div className='relative'>
        <p className='absolute z-20 bottom-0  right-0 text-sm bg-black/60 rounded-tl-lg px-2 py-1'>
          {video.duration}
        </p>
        <img src={video.thumbnailUrl} className='absolute w-full z-10 rounded-t-md ' alt='' />
        <img src={video.thumbnailUrl} className='rounded-t-md w-full blur-md' alt='' />
      </div>
      <div className='text-sm p-2 '>
        <p>{video.title}</p>
        <span className='flex justify-between text-zinc-700 '>
          <p>{video.views}</p>
          <p>{video.date}</p>
        </span>
      </div>
    </div>
  );
};
export default VideoCard;
