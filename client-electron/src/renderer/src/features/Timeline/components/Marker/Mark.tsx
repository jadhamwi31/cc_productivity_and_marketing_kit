import React, { useState } from 'react';
import { S } from './Marker.styled';
import Draggable from 'react-draggable';
import { useVideoStore } from '../../../../stores/video.store';

type Props = { x: number };

const Mark = ({ x }: Props) => {
  const { trail, setTrailEnd, setTrailStart } = useVideoStore();
  const { start, end } = trail;

  return (
    <>
      {start && <S.Spot style={{ left: start }} />}
      <Draggable
        onStart={() => {
          setTrailStart(x);
          setTrailEnd(null);
        }}
        onStop={(_, element) => {
          setTrailEnd(element.x);
        }}
        onDrag={(_, element) => {
          setTrailEnd(element.x);
        }}
        axis='x'
        position={{ y: 0, x }}
      >
        <S.Mark>
          <S.Handle className='handle' />
        </S.Mark>
      </Draggable>
      {end && <S.Spot style={{ left: end }} />}
      {trail.start && trail.end ? (
        <S.Trail
          style={{
            left: trail.end > trail.start ? trail.start : trail.end,
            width: Math.abs(trail.end - trail.start),
          }}
        />
      ) : null}
    </>
  );
};

export default Mark;
