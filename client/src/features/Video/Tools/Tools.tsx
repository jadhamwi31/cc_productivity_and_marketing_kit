import React, { useRef } from 'react';
import Button from '../../../components/Button/Button';
import { useCurrentTab } from '../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../stores/videos.store';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';
import { S } from './Tools.styled';

type Props = {};

const Tools = (props: Props) => {
  const { uploadFile, playback, setPlayback, cut, undo, redo, downloadVideo } = useVideosStore();
  const uploadRef = useRef<HTMLInputElement>(null);

  const uploadHandler: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (uploadRef.current && uploadRef.current.value !== '') {
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

  const tab = useCurrentTab();

  return (
    <S.Container>
      <Button
        onClick={() => {
          if (uploadRef.current?.value) uploadRef.current.value = '';
          uploadRef.current?.click();
        }}
      >
        Upload
      </Button>
      <S.UploadHidden
        type='file'
        accept='video/*, audio/*'
        ref={uploadRef}
        onChange={uploadHandler}
      />
      <Button onClick={playbackHandler} disabled={tab.videoId === null}>
        {playback === EnVideoPlayback.PAUSED ? 'Play' : 'Pause'}
      </Button>
      <Button
        onClick={cut}
        disabled={tab.videoId === null || tab.selectorStart === 0 || tab.selectorEnd === 0}
      >
        Cut
      </Button>
      <Button onClick={undo} disabled={tab.undo.length === 1}>
        Undo
      </Button>
      <Button onClick={redo} disabled={tab.redo.length === 1}>
        Redo
      </Button>
      <Button
        disabled={tab.uploadProgress !== 100 || tab.videoUrl === null}
        onClick={downloadVideo}
      >
        Download
      </Button>
    </S.Container>
  );
};

export default Tools;
