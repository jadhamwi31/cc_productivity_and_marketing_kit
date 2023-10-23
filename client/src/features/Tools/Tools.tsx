import {
  faBackward,
  faPause,
  faPlay,
  faScissors,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import { useVideoElement } from '../../hooks/useVideoElement';
import { ISource, useVideoStore } from '../../stores/video.store';
import { EnVideoPlayback } from '../../ts/enums/video.enums';
import { S } from './Tools.styled';
import ToolItem from './components/Item/ToolItem';
import { useToolsStore } from './stores/tools.store';
import { EnToolItem } from './ts/tools.enums';
import _ from 'lodash';
import { filesToSources } from './utils/utils';

type Props = {};

const Tools = (props: Props) => {
  const videoRef = useVideoElement();

  const { selectedItem, setSelectedItem } = useToolsStore();
  const { addSources, playback, setPlayback } = useVideoStore();
  const itemToggleHandler = (tool: EnToolItem) =>
    setSelectedItem(tool === selectedItem ? EnToolItem.NONE : tool);

  const selectedPredicate = (value: EnToolItem) => value === selectedItem;
  const uploadOnClick = () => uploadRef.current && uploadRef.current.click();
  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files) {
      const files = e.target.files;
      const sources = await filesToSources(files);
      addSources(sources);
    }
  };
  const uploadRef = useRef<HTMLInputElement>(null);

  const playbackHandler = () => {
    console.log(videoRef, playback);

    if (playback === EnVideoPlayback.PLAYING) {
      videoRef?.pause();
    } else {
      videoRef?.play();
    }
  };

  return (
    <S.Container>
      <ToolItem
        icon={playback === EnVideoPlayback.PLAYING ? faPause : faPlay}
        name={playback === EnVideoPlayback.PLAYING ? 'Pause' : 'Play'}
        value={EnToolItem.PLAYSTATE}
        onClick={playbackHandler}
      />
      <ToolItem icon={faUpload} name={'Upload'} value={EnToolItem.UPLOAD} onClick={uploadOnClick} />
      <S.UploadHiddenInput
        ref={uploadRef}
        type='file'
        accept='video/*,audio/*'
        onChange={onFileUpload}
        multiple
      />
    </S.Container>
  );
};

export default Tools;
