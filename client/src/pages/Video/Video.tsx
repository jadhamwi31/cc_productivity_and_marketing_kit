import Player from '../../features/Video/Player/Player';
import Tabs from '../../features/Video/Tabs/Tabs';
import Timeline from '../../features/Video/Timeline/Timeline';

import Tools from '../../features/Video/Tools/Tools';
import Transcript from '../../features/Video/Transcript/Transcript';
import { S } from './Video.styled';

type Props = {};

const Video = (props: Props) => {
  return (
    <S.Container>
      <Tabs />
      <S.PlayerToolsTranscriptRow>
        <Tools />
        <Player />
        <Transcript />
      </S.PlayerToolsTranscriptRow>
      <Timeline />
    </S.Container>
  );
};

export default Video;
