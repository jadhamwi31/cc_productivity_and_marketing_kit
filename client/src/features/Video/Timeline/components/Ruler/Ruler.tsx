import React, { useEffect, useState } from 'react';
import { S } from './Ruler.styled';
import { useCurrentTab } from '../../../../../hooks/useCurrentTab';
import { useMeasure } from '@uidotdev/usehooks';

const getRulerTimestamps = (duration: number) => {
  const interval = duration / 8;
  const timestamps: number[] = [];
  for (let i = 0; i < duration; i += interval) {
    timestamps.push(Math.floor(i));
  }
  return timestamps;
};

type Props = {};

const Ruler = (props: Props) => {
  const tab = useCurrentTab();

  const [timestamps, setTimestamps] = useState<number[]>([]);
  useEffect(() => {
    setTimestamps(getRulerTimestamps(tab.duration));
  }, [tab.duration]);
  return (
    <S.Container>
      {timestamps.map((timestamp) => (
        <S.Timestamp>{timestamp}</S.Timestamp>
      ))}
    </S.Container>
  );
};

export default Ruler;
