import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import VideoCard from '../../../components/Dashboard/Scrapping/VideoCard';
import { IoSync } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { MdOutlineVideoSettings } from 'react-icons/md';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);
  return response.json();
};

export default function VideosPage() {
  const refreshVideos = async (id: string) => {
    setLoading(true);
    const response = await fetch(`/youtube/videos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
    });
    setLoading(false);
    const json = await response.json();
    if (response.ok) {
      toast.success('Videos Refreshed Successfully');
      mutate(`/youtube/getChannelVideos/${id}`);
    } else {
      toast.error('Try again ');
    }
  };
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();
  const { data, error, isValidating } = useSWR<any>(`/youtube/getChannelVideos/${id}`, fetcher);

  if (!data) {
    return null;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className=' pt-20'>
      <div className=' w-[90%] lg:w-[75%] mx-auto border-2 border-New_Gray rounded-lg '>
        <div className='relative'>
          <img
            className='absolute  w-full h-80 rounded-t-lg z-10  object-cover'
            style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
            src={data.banner ? data.banner : 'https://placehold.co/100x100?text=Channel+Banner'}
            alt=''
          />
          <img
            className='rounded-t-lg w-full h-80 blur-md object-cover '
            style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
            src={data.banner ? data.banner : 'https://placehold.co/100x100?text=Channel+Banner'}
            alt=''
          />
          <img
            style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
            src={data.avatar}
            alt=''
            className='rounded-full w-32 lg:w-48 object-cover absolute z-20 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'
          />
        </div>
        <div className=' text-base  p-5 lg:p-10 flex justify-between'>
          <div>
            <p>{data.channel}</p>
            <p>{data.count}</p>
          </div>
          {data.videos.length == 0 ? (
            <button
              disabled={Loading}
              className='disabled:text-New_Gray text-center  text-sm disabled:cursor-not-allowed hover:text-[#70358a]'
              onClick={() => {
                refreshVideos(data.channel);
              }}
            >
              <MdOutlineVideoSettings size={40} className=' mb-2 mx-auto' />
              Get Vidoes
            </button>
          ) : (
            <button
              className='disabled:text-New_Gray disabled:cursor-not-allowed'
              onClick={() => {
                refreshVideos(data.channel);
              }}
            >
              <IoSync size={40} className='hover:text-blue-500 mb-2' />
            </button>
          )}
        </div>
        {Loading ? (
          <div className='flex-col items-center text-center w-full justify-center py-10'>
            <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
              <Skeleton width={1100} count={3} height={20} />
            </SkeletonTheme>
          </div>
        ) : (
          <div className='mx-auto text-2xl min-h-full grid  grid-cols-1 lg:grid-cols-4 gap-7 p-5 lg:p-10 '>
            {data &&
              data.videos.map((video: any, index: number) => (
                <>
                  <VideoCard video={video} key={index} />
                </>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
