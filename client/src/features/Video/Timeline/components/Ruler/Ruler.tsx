import { useEffect, useState } from 'react';
import { useCurrentTab } from '../../../../../hooks/useCurrentTab';
import { formatTimestamp } from '../../../../../utils/utils';
import { S } from './Ruler.styled';

const getRulerTimestamps = (duration: number) => {
  const interval = duration / 15;
  const timestamps: number[] = [];
  for (let i = 0; i <= duration; i += interval) {
    timestamps.push(Math.ceil(i));
  }
  return timestamps;
};

type Props = {};

const Ruler = (props: Props) => {
  const tab = useCurrentTab();

  const [timestamps, setTimestamps] = useState<number[]>([]);
  useEffect(() => {
    if (tab.duration) {
      setTimestamps(getRulerTimestamps(tab.duration));
    }
  }, [tab.duration]);
  return (
    <S.Container>
      {timestamps.map((timestamp) => (
        <S.Timestamp key={timestamp}>{formatTimestamp(timestamp)}</S.Timestamp>
      ))}
    </S.Container>
  );
};

export default Ruler;
