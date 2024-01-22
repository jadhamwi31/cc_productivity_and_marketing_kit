import React from 'react';
import useSWR from 'swr';
import { NavLink, Outlet } from 'react-router-dom';
const fetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);
  return response.json();
};

export default function DahsboardCahnnelLayout() {
  const { data, error, isValidating } = useSWR<any>('/youtube/myChannels', fetcher);
  const ahmad = ``;
  return (
    <div className='px-8 '>
      <h1 className='text-4xl my-10 mb-14 font-bold'>Dashboard</h1>
      <div className='flex flex-col lg:flex-row justify-between gap-4 '>
        <div className='w-full lg:w-[30%]  rounded-lg border border-zinc-900'>
          <h1 className='  font-semibold p-2  bg-zinc-900 text-lg rounded-t-lg w-full '>
            My Channels
          </h1>
          {data ? (
            data.data.map((userData) => (
              <div key={userData._id} className='flex-col gap-20'>
                {userData.channels.map((channel) => (
                  <NavLink to={`/dashboard/report/${channel.channelHandle}`}>
                    <div className='flex gap-4 p-2  border-t border-zinc-900  items-center self'>
                      <img
                        src={channel.avatar}
                        className='w-10 h-10  border border-zinc-800 rounded-full'
                        alt=''
                      />
                      <p className='text-lg'>{channel.channelHandle}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className='w-full rounded-lg border border-zinc-900'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
