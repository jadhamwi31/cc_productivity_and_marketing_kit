import React, { useRef } from 'react';
import { S } from './Tools.styled';
import Button from '../../../components/Button/Button';
import { useVideosStore } from '../../../stores/videos.store';
import { createSources } from './helpers/Tools.helpers';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';

type Props = {};

const Tools = (props: Props) => {
  const { uploadFile, playback, setPlayback } = useVideosStore();
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

  return (
    <S.Container>
      <Button onClick={() => uploadRef.current?.click()}>Upload</Button>
      <S.UploadHidden
        type='file'
        accept='video/*, audio/*'
        ref={uploadRef}
        onChange={uploadHandler}
      />
      <Button onClick={playbackHandler}>
        {playback === EnVideoPlayback.PAUSED ? 'Play' : 'Pause'}
      </Button>
    </S.Container>
  );
};

export default Tools;
