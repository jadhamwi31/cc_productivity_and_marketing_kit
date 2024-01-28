import React from 'react';
import { Link } from 'react-router-dom';
interface VideoProps {
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

const VideoCard: React.FC<VideoProps> = ({ video }) => {
  const getYouTubeVideoId = (url) => (url.match(/[?&]v=([^&]+)/) ?? [])[1];

  return (
    <Link to={`/dashboard/videoDetails/${getYouTubeVideoId(video.href)}`}>
      <div className='border-2 border-New_Gray rounded-md  '>
        <div className='relative'>
          <p className='absolute z-20 bottom-0  right-0 text-sm bg-black/60 rounded-tl-lg px-2 py-1'>
            {video.duration}
          </p>
          <img src={video.thumbnailUrl} className='absolute w-full z-10 rounded-t-md ' alt='' />
          <img src={video.thumbnailUrl} className='rounded-t-md w-full blur-md' alt='' />
        </div>
        <div className='text-sm p-2'>
          <div
            className='title-container'
            style={{
              minHeight: '2.8em',
              maxHeight: '3em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <p>{video.title}</p>
          </div>
          <div className='flex justify-between text-zinc-700 '>
            <p>{video.views}</p>
            <p>{video.date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
