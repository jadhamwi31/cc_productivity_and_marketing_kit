import { useEffect, useState } from 'react';
import { useTabStore } from '../../../../../hooks/useCurrentTab';
import { S } from './Line.styled';

type Props = {};

const Line = (props: Props) => {
  const [width, setWidth] = useState(0);
  const tab = useTabStore();

  useEffect(() => {
    setWidth((tab.currentDuration / tab.duration) * 100);
  }, [tab.duration, tab.currentDuration]);

  return tab.videoId && <S.Container style={{ width: `${width}%` }} />;
};

export default Line;
