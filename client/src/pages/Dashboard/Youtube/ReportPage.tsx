import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import Flag from 'react-world-flags';

interface ChannelInfoData {
  uploads: string;
  subscribers: string;
  videoViews: string;
  userCreated: string;
  channelType: string;
  country: string;
  positionHint: string;
  vidviewsSVG: string | null;
  subscribersSVG: string | null;
  earnings: string;
  avatarSrc: string | null;
  headerBackgroundUrl: string | null;
}

export default function ReportPage() {
  let [isOpen, setIsOpen] = useState(true);

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ChannelInfoData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/youtube/report/${id}`);
        const result: ChannelInfoData = await response.json();
        setData(result);
        if (data?.uploads == null) {
          fetchData;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div>
          <div className='relative mb-20 p-0'>
            <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
              <Skeleton height={176} />

              <Skeleton
                circle
                width={128}
                height={128}
                containerClassName='absolute  z-20 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'
              />
            </SkeletonTheme>
          </div>
          <div className='flex flex-col lg:flex-row justify-evenly'>
            <div className='flex-col'>
              <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
                <Skeleton width={100} count={1} height={10} />
                <Skeleton width={100} count={1} height={10} />
              </SkeletonTheme>
            </div>
            <div className='flex-col'>
              <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
                <Skeleton width={100} count={1} height={10} />
                <Skeleton width={100} count={1} height={10} />
              </SkeletonTheme>
            </div>
            <div className='flex-col'>
              <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
                <Skeleton width={100} count={1} height={10} />
                <Skeleton width={100} count={1} height={10} />
              </SkeletonTheme>
            </div>
            <div className='flex-col'>
              <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
                <Skeleton width={100} count={1} height={10} />
                <Skeleton width={100} count={1} height={10} />
              </SkeletonTheme>
            </div>
            <div className='flex-col'>
              <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
                <Skeleton width={100} count={1} height={10} />
                <Skeleton width={100} count={1} height={10} />
              </SkeletonTheme>
            </div>
            <div className='flex-col'>
              <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
                <Skeleton width={100} count={1} height={10} />
                <Skeleton width={100} count={1} height={10} />
              </SkeletonTheme>
            </div>
          </div>
          <div className='flex-col mt-6 text-center'>
            <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
              <Skeleton width={100} count={1} height={10} />
              <Skeleton width={100} count={1} height={10} />
            </SkeletonTheme>
          </div>

          <div className='flex items-center justify-center mt-6 '>
            <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
              <Skeleton width={1000} count={1} height={200} />
            </SkeletonTheme>
          </div>
          <div className='flex items-center justify-center mt-6'>
            <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
              <Skeleton width={1000} count={1} height={200} />
            </SkeletonTheme>
          </div>
        </div>
      ) : (
        <div>
          <div className='relative mb-20'>
            <img
              className='absolute  w-full h-44 rounded-t-lg z-10  object-cover'
              style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
              src={
                data?.headerBackgroundUrl
                  ? data.headerBackgroundUrl
                  : 'https://placehold.co/100x100?text=Channel+Banner'
              }
              alt=''
            />
            <img
              className='rounded-t-lg w-full h-44 blur-md object-cover '
              style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
              src={
                data?.headerBackgroundUrl
                  ? data.headerBackgroundUrl
                  : 'https://placehold.co/100x100?text=Channel+Banner'
              }
              alt=''
            />
            <img
              style={{ viewTransitionName: `image${id}`, contain: 'layout' }}
              src={data?.avatarSrc ? data?.avatarSrc : ''}
              alt=''
              className='rounded-full w-32 lg:w-32 object-cover absolute z-20 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'
            />
          </div>
          <div className='flex flex-col lg:flex-row justify-evenly'>
            <div className='flex-col'>
              <p className='text-center text-xl'>{data?.uploads}</p>
              <p className='text-center text-zinc-700 text-md uppercase'>Uploads</p>
            </div>
            <div className='flex-col'>
              <p className='text-center text-xl'>{data?.subscribers}</p>
              <p className='text-center text-zinc-700 text-md uppercase'>Subscribers</p>
            </div>
            <div className='flex-col'>
              <p className='text-center text-xl'>{Number(data?.videoViews).toLocaleString()}</p>
              <p className='text-center  text-zinc-700 text-md uppercase'>Views</p>
            </div>
            <div className='flex-col'>
              <p className='text-center text-xl'>{data?.channelType}</p>
              <p className='text-center text-zinc-700 text-md uppercase'>Category</p>
            </div>
            <div className='flex-col'>
              <p className='text-center text-xl'>
                {data?.country ? <Flag code={data?.country} height='16' /> : 'N/A'}
              </p>
              <p className='text-center text-zinc-700 text-md uppercase'>Country</p>
            </div>
            <div className='flex-col'>
              <p className='text-center text-xl'>{data?.positionHint}</p>
              <p className='text-center text-zinc-700 text-md uppercase'>Position</p>
            </div>
          </div>

          <div
            className='flex items-center justify-center mt-6'
            dangerouslySetInnerHTML={
              data?.subscribersSVG ? { __html: data.subscribersSVG } : undefined
            }
          ></div>
          <div
            className='flex items-center justify-center mt-6'
            dangerouslySetInnerHTML={data?.vidviewsSVG ? { __html: data.vidviewsSVG } : undefined}
          ></div>
        </div>
      )}
    </div>
  );
}
