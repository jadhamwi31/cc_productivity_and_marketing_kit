import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { axios } from '../../../lib/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Dialog, Transition } from '@headlessui/react'; // Added Transition and Fragment

interface ChartData {
  label: string;
  value: number;
  percentage: number;
}

interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
}

export default function VideoDetails() {
  const { id } = useParams();
  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sentimentState, setSentimentState] = useState<SentimentData>({} as SentimentData);
  const [showSentiment, setShowSentiment] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      console.log('ad');
      try {
        setLoading(true);
        const response = await fetch('/youtube/getComments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
          },
          body: JSON.stringify({
            url: `https://www.youtube.com/watch?v=${id}`,
          }),
        });
        const fetchedComments = await response.json();
        setLoading(false);
        if (response.ok) {
          setComments(fetchedComments);
        } else {
          setComments([]);
          console.error('Failed to fetch Comments');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
    getComments();
  }, []);

  const chartData: ChartData[] = useMemo(() => {
    if (!isEmpty(sentimentState)) {
      const data = sentimentState;

      const labels = Object.keys(data);
      const values = Object.values(data);

      const total = values.reduce((acc, value) => acc + value, 0);
      const percentages = values.map((value) => (value / total) * 100);

      return labels.map((label, index) => ({
        label,
        value: values[index],
        percentage: percentages[index],
      }));
    } else {
      return [];
    }
  }, [sentimentState]);

  const closeModal = () => setShowSentiment(false); // Define closeModal function

  return (
    <>
      {showSentiment && chartData && (
        <>
          <Transition appear show={showSentiment} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-black bg-opacity-60' />
              </Transition.Child>
              <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                      <Dialog.Title
                        as='h3'
                        className='text-xlg font-medium leading-6 text-gray-900'
                      >
                        Sentiment Analysis {/* Changed Title */}
                      </Dialog.Title>
                      <div className='mt-2'>
                        <ResponsiveContainer height={400}>
                          <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
                          >
                            <XAxis dataKey='label' />
                            <YAxis />

                            <Bar dataKey='percentage' name='Sentiment Analysis'>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getSentimentColor(entry.label)} />
                              ))}
                              <LabelList
                                dataKey='percentage'
                                position='insideTop'
                                content={({ value }) =>
                                  typeof value === 'number' ? `${value.toFixed(2)}%` : ''
                                }
                              />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                        <p>Negative: {(sentimentState.negative * 100).toFixed(2)}%</p>
                        <p>Neutral: {(sentimentState.neutral * 100).toFixed(2)}%</p>
                        <p>Positive: {(sentimentState.positive * 100).toFixed(2)}%</p>
                        <p className='text-sm text-gray-600'>You Are Trying to Delete </p>
                      </div>
                      <button onClick={() => setShowSentiment(false)}>Close</button>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
      <div className='p-5'>
        <h1 className='text-4xl my-10 mb-14 font-bold'>Comments</h1>

        <div className='mx-auto text-white text-lg w-[70vw]'>
          {comments && (
            <div className='flex justify-between'>
              <p className='text-white text-lg'> {comments.length} Comments</p>
              <button
                disabled={comments.length === 0}
                className='w-56 text-white bg-[#581C87] ml-auto hover:bg-[#A149FA] rounded disabled:cursor-not-allowed disabled:text-gray-500'
                onClick={async () => {
                  if (isEmpty(sentimentState)) {
                    setAnalyzing(true);
                    const { data: sentiment } = await axios
                      .post<void, AxiosResponse<SentimentData>>('/ai/reactions', {
                        comments,
                      })
                      .finally(() => {
                        setAnalyzing(false);
                      });
                    setSentimentState(sentiment);
                    setShowSentiment(true); // Show the sentiment chart after receiving data
                  } else {
                    setShowSentiment(true);
                  }
                }}
              >
                {analyzing
                  ? 'Analyzing...'
                  : isEmpty(sentimentState)
                  ? 'Analyze Comments'
                  : 'View Analysis Results'}
              </button>
            </div>
          )}
          {loading ? (
            <>
              <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
                <Skeleton containerClassName='w-full' count={10} height={20} />
              </SkeletonTheme>
            </>
          ) : (
            comments &&
            comments.map((d: string, index: number) => (
              <p className='border-b border-zinc-900  pb-2' key={index}>
                {d}
              </p>
            ))
          )}
        </div>
      </div>
    </>
  );
}

function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case 'positive':
      return '#00764B'; // Green
    case 'negative':
      return '#D7362F'; // Red
    case 'neutral':
      return '#F7B011'; // Yellow
    default:
      return '#888888'; // Default color for unknown sentiments
  }
}
