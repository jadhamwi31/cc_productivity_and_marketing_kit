import React from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';

interface ChartData {
  label: string;
  value: number;
  percentage: number;
}

export default function VideoDetails() {
  const { id } = useParams();
  const data = {
    positive: 0.6478115717569987,
    neutral: 0.04075773743291696,
    negative: 0.3114306926727295,
  };

  const labels = Object.keys(data);
  const values = Object.values(data);

  const total = values.reduce((acc, value) => acc + value, 0);
  const percentages = values.map((value) => (value / total) * 100);

  const chartData: ChartData[] = labels.map((label, index) => ({
    label,
    value: values[index],
    percentage: percentages[index],
  }));

  return (
    <div className='p-5'>
      <h2>Video Details</h2>
      <p>Video ID: {id}</p>
      <div className='w-[300px] border border-zinc-900 rounded-lg'>
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
                content={({ value }) => (typeof value === 'number' ? `${value.toFixed(2)}%` : '')}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div></div>
      <p>Negative :{(data.negative * 100).toFixed(2)}%</p>
      <p>Neutral : {(data.neutral * 100).toFixed(2)}%</p>
      <p>Positive : {(data.positive * 100).toFixed(2)}%</p>
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
