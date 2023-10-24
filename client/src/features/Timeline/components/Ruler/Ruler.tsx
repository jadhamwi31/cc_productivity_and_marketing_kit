import React, { useMemo } from 'react';
import { S } from './Ruler.styled';
import { useVideoStore } from '../../../../stores/video.store';
import _ from 'lodash';
import { formatTimestamp } from '../../../../utils/utils';

function generateAutoSegmentedTimestamps(duration: number) {
  const MAX_SEGMENTS = 10;
  const SEGMENT_DURATION = 5;

  let numSegments = Math.ceil(duration / SEGMENT_DURATION);

  numSegments = Math.min(numSegments, MAX_SEGMENTS);

  const interval = Math.ceil(duration / numSegments);
  const timestamps = [];

  for (let i = 0; i <= duration; i += interval) {
    const minutes = Math.floor(i / 60);
    const seconds = i % 60;
    timestamps.push(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
  }

  return timestamps;
}
type Props = {};

const Ruler = (props: Props) => {
  const { sources } = useVideoStore();

  const timestamps = useMemo(() => {
    if (sources) {
      const maxSource = _.maxBy(sources, 'duration');
      if (maxSource) {
        return generateAutoSegmentedTimestamps(maxSource.duration);
      }
    } else {
      return [];
    }
  }, [sources]);

  return (
    <S.Container>
      {timestamps?.map((timestamp, i) => (
        <>
          <S.Timestamp>{formatTimestamp(timestamp)}</S.Timestamp>
          {_.range(3).map(() => (
            <S.TimestampSegmentTick />
          ))}
        </>
      ))}
    </S.Container>
  );
};

export default Ruler;
