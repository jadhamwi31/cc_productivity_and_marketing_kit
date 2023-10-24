import _ from 'lodash';
import { useRef } from 'react';
import { useVideoStore } from '../../../../stores/video.store';
import Line from './Line';
import { S } from './Lines.styled';

type Props = {};

const Lines = (props: Props) => {
  const videoEvents = useVideoStore((state) =>
    state.events.filter((event) => event.sourceType.startsWith('video')),
  );
  const audioEvents = useVideoStore((state) =>
    state.events.filter((event) => event.sourceType.startsWith('audio')),
  );
  const { sources } = useVideoStore();
  const parentRef = useRef<HTMLDivElement>(null);
  const maxSource = _.maxBy(sources, 'duration')!;

  return (
    <S.Container ref={parentRef}>
      {videoEvents.length !== 0 &&
        videoEvents.map((videoEvent) => <Line event={videoEvent} max={maxSource.duration} />)}
      {audioEvents.length !== 0 &&
        audioEvents.map((videoEvent) => <Line event={videoEvent} max={maxSource.duration} />)}
    </S.Container>
  );
};

export default Lines;
