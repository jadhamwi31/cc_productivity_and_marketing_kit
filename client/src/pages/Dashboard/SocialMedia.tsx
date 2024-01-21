import AddChannle from '../../components/Dashboard/Scrapping/AddChannle';
import React from 'react';
import useSWR from 'swr';
import Channel from '../../components/Dashboard/Scrapping/Channel';

interface ChannelData {
  avatar: string;
  channelName: string;
  channelHandle: string;
  totalSubscribers: string;
  totalVideos: string;
  backgroundImageUrl: string | null;
  _id: string;
}

interface UserData {
  _id: string;
  username: string;
  channels: ChannelData[];
  __v: number;
}

interface ApiResponse {
  data: UserData[];
}

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);
  return response.json();
};

const SocialMedia: React.FC = () => {
  const { data, error, isValidating } = useSWR<ApiResponse>('/youtube/myChannels', fetcher);

  if (isValidating) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className='p-5'>
      {data ? (
        data.data.map((userData) => (
          <div
            key={userData._id}
            className=' grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'
          >
            {userData.channels.map((channel) => (
              <Channel key={channel._id} channel={channel} />
            ))}
            <AddChannle />
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SocialMedia;
