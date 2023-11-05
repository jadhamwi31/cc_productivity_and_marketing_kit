import { useEffect, useState } from 'react';
import { useTabStore } from '../../../../../hooks/useCurrentTab';
import { S } from './Line.styled';
import { useMeasure } from '@uidotdev/usehooks';
import { useVideosStore } from '../../../../../stores/videos.store';

type Props = {};

const Line = (props: Props) => {
  const [progress, setProgress] = useState(0);
  const tab = useTabStore();
  const { setLineWidth } = useVideosStore();
  useEffect(() => {
    if (tab.videoId !== null) setProgress((tab.currentTime / tab.duration) * 100);
  }, [tab.currentTime, tab.duration]);
  const [ref, { width: widthInPixels }] = useMeasure<HTMLDivElement>();
  useEffect(() => {
    if (widthInPixels) setLineWidth(widthInPixels);
  }, [widthInPixels, tab]);
  return (
    tab.videoId && (
      <S.Container style={{ width: `100%` }} ref={ref}>
        <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'var(--blue)' }} />
      </S.Container>
    )
  );
};

export default Line;
