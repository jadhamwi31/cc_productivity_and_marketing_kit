import React, { useRef } from 'react';
import { S } from './Tools.styled';
import Button from '../../../components/Button/Button';
import { useVideosStore } from '../../../stores/videos.store';
import { createSources } from './helpers/Tools.helpers';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';
import { useTabStore } from '../../../hooks/useCurrentTab';
import { useVideoElement } from '../../../hooks/useVideoElement';

type Props = {};

const Tools = (props: Props) => {
  const { uploadFile, playback, setPlayback, cut, updateVideoDuration, updateVideoCurrentTime } =
    useVideosStore();
  const uploadRef = useRef<HTMLInputElement>(null);
  const uploadHandler: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (uploadRef.current) {
      const files = e.target.files;
      if (files && files[0]) {
        uploadFile(files[0]);
      }
    }
  };

  const playbackHandler = () => {
    if (playback === EnVideoPlayback.PAUSED) {
      setPlayback(EnVideoPlayback.PLAYING);
    } else {
      setPlayback(EnVideoPlayback.PAUSED);
    }
  };

  const cutHandler = () => {
    cut(5, 15);
  };

  const tab = useTabStore();

  return (
    <S.Container>
      <Button onClick={() => uploadRef.current?.click()}>Upload</Button>
      <S.UploadHidden
        type='file'
        accept='video/*, audio/*'
        ref={uploadRef}
        onChange={uploadHandler}
      />
      <Button onClick={playbackHandler} disabled={tab.videoId === null}>
        {playback === EnVideoPlayback.PAUSED ? 'Play' : 'Pause'}
      </Button>
      <Button onClick={cutHandler} disabled={tab.videoId === null}>
        Cut
      </Button>
    </S.Container>
  );
};

export default Tools;
