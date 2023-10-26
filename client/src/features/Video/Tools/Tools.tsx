import React, { useRef } from 'react';
import { S } from './Tools.styled';
import Button from '../../../components/Button/Button';
import { useVideosStore } from '../../../stores/videos.store';
import { createSources } from './helpers/Tools.helpers';

type Props = {};

const Tools = (props: Props) => {
  const { uploadFile } = useVideosStore();
  const uploadRef = useRef<HTMLInputElement>(null);
  const uploadHandler: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (uploadRef.current) {
      const files = e.target.files;
      if (files && files[0]) {
        uploadFile(files[0]);
      }
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
    </S.Container>
  );
};

export default Tools;
