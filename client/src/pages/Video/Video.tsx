import Player from '../../features/Player/Player';
import Timeline from '../../features/Timeline/Timeline';

import { S } from './Video.styled';

type Props = {};

const Video = (props: Props) => {
  return (
    <S.Container>
      <Player style={{ height: '50vh', width: '50vw' }} />
      <Timeline />
    </S.Container>
  );
};

export default Video;
