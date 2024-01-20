import { useMeasure } from '@uidotdev/usehooks';
import { S } from './Timeline.styled';
import Cursor from './components/Cursor/Cursor';
import Line from './components/Line/Line';
import Ruler from './components/Ruler/Ruler';
import Selector from './components/Selector/Selector';
import Partitions from './components/Partitions/Partitions';
import React from "react";

type Props = {};

const Timeline = (props: Props) => {
  const [containerRef, { height: containerHeight }] = useMeasure<HTMLDivElement>();
  const [wrapperRef, { width: wrapperWidth }] = useMeasure<HTMLDivElement>();
  return (
    <S.Container ref={containerRef}>
      <S.Wrapper ref={wrapperRef}>
        <Ruler />
        <Cursor containerHeight={containerHeight ?? 0} />
        <Selector containerHeight={containerHeight ?? 0} wrapperWidth={wrapperWidth ?? 0} />
        <Line />
        <Partitions containerHeight={containerHeight ?? 0} wrapperWidth={wrapperWidth ?? 0} />
      </S.Wrapper>
    </S.Container>
  );
};

export default Timeline;
