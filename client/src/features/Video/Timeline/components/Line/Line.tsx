import { useMeasure } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { useCurrentTab } from '../../../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../../../stores/videos.store';
import { S } from './Line.styled';

type Props = {};

const Line = (props: Props) => {
  const [progress, setProgress] = useState(0);
  const tab = useCurrentTab();
  const { updateTab } = useVideosStore();
  useEffect(() => {
    if (tab.videoId !== null) setProgress((tab.currentTime / tab.duration) * 100);
  }, [tab.currentTime, tab.duration]);
  const [ref, { width: widthInPixels }] = useMeasure<HTMLDivElement>();
  useEffect(() => {
    if (widthInPixels) updateTab({ lineWidth: widthInPixels });
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
