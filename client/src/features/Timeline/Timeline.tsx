import React from 'react';
import { useVideoStore } from '../../stores/video.store';
import { S } from './Timeline.styled';
import Ruler from './components/Ruler/Ruler';

type Props = {};

const Timeline = (props: Props) => {
  const { sources } = useVideoStore();
  return (
    <S.Container>
      <Ruler />
      {/* {sources.map((source) => (
        <div key={source.id}>
          {source.id} - {source.mimeType} - {source.duration}
        </div>
      ))} */}
    </S.Container>
  );
};

export default Timeline;
