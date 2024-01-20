import Player from '../../features/Video/Player/Player';
import Tabs from '../../features/Video/Tabs/Tabs';
import Timeline from '../../features/Video/Timeline/Timeline';
import Controls from '../../features/Video/Tools/Controls';
import React from 'react';

import Tools from '../../features/Video/Tools/Tools';
import Transcribe from '../../features/Video/Transcribe/Transcribe';
import { S } from './Video.styled';

type Props = {};

const Video = (props: Props) => {
  return (
    <S.Container>
      <Tabs />
      <S.PlayerToolsTranscriptRow>
        <Tools />
        <Transcribe />
        <Player />
      </S.PlayerToolsTranscriptRow>
      <Controls />
      <Timeline />
    </S.Container>
  );
};

export default Video;
