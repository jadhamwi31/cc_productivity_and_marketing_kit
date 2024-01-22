import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import VideoCard from '../../../components/Dashboard/Scrapping/VideoCard';

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);
  return response.json();
};
export default function Videos() {
  let { id } = useParams();
  const { data, error, isValidating } = useSWR<any>(`/youtube/getChannelVideos/${id}`, fetcher);

  return (
    <div className=' pt-20'>
      <div className=' w-[90%] lg:w-[75%] mx-auto border-2 border-New_Gray rounded-lg '>
        <div className='relative mb-40'>
          <img
            className='absolute  w-full  rounded-t-lg z-10  object-cover'
            style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
            src='https://yt3.googleusercontent.com/nz-QloLMfW970vXXPRxyKq7ZBz0f9oQGS3dZSaTPEFa3LJyr-5cCT9AYBPgh9vOtYo3JQyAP=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'
            alt=''
          />
          <img
            className='rounded-t-lg w-full blur-md object-cover '
            style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
            src='https://yt3.googleusercontent.com/nz-QloLMfW970vXXPRxyKq7ZBz0f9oQGS3dZSaTPEFa3LJyr-5cCT9AYBPgh9vOtYo3JQyAP=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'
            alt=''
          />
          <img
            style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
            src='https://yt3.googleusercontent.com/GbVup85zkiPd9eLQXBdskh3Z8w1n6TUyV0cQonLDLUmzK870yaLdMznLYQnEqIc-sP-U_bhG3J4=s176-c-k-c0x00ffffff-no-rj'
            alt=''
            className='rounded-full w-[20%] lg:w-[13%] object-cover absolute z-20 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'
          />
        </div>
        <div className='mx-auto text-2xl min-h-screen grid  grid-cols-1 lg:grid-cols-4 gap-7 p-5 lg:p-10 '>
          {data.videos.map((video: any, index: number) => (
            <>
              <VideoCard video={video} key={index} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
