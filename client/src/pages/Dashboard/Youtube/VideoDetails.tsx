import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { axios } from '../../../lib/axios';

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
          console.error('Failed to fetch Commenst');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
    getComments();
  }, []);

  const chartData: ChartData[] = useMemo(() => {
    if (sentimentState) {
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

  const [showSentiment, setShowSentiment] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  return (
    <div className='p-5'>
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
        {loading
          ? 'Loading'
          : comments &&
            comments.map((d: string, index: number) => (
              <p className='border-b border-zinc-900  pb-2' key={index}>
                {d}
              </p>
            ))}
      </div>

      {showSentiment && chartData && (
        <>
          <div
            className='w-[300px] border border-zinc-900 rounded-lg'
            onClick={() => setShowSentiment(false)}
          >
            <ResponsiveContainer height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
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
          </div>
          <p>Negative :{(sentimentState.negative * 100).toFixed(2)}%</p>
          <p>Neutral : {(sentimentState.neutral * 100).toFixed(2)}%</p>
          <p>Positive : {(sentimentState.positive * 100).toFixed(2)}%</p>
        </>
      )}
    </div>
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
