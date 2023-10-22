import {
  faBackward,
  faPause,
  faPlay,
  faScissors,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { useVideoElement } from '../../hooks/useVideoElement';
import { useVideoStore } from '../../stores/video.store';
import { EnVideoPlayState } from '../../ts/enums/video.enums';
import { S } from './Tools.styled';
import ToolItem from './components/Item/ToolItem';
import { useToolsStore } from './stores/tools.store';
import { EnToolItem } from './ts/tools.enums';

type Props = {};

const Tools = (props: Props) => {
  const { playState, cutVideo, undo, stack, trail } = useVideoStore();
  const videoRef = useVideoElement();
  const videoStateHandler = () => {
    if (playState === EnVideoPlayState.PAUSED) {
      videoRef?.play();
    } else {
      videoRef?.pause();
    }
  };

  const { selectedItem, setSelectedItem } = useToolsStore();
  const { uploadVideo } = useVideoStore();
  const itemToggleHandler = (tool: EnToolItem) =>
    setSelectedItem(tool === selectedItem ? EnToolItem.NONE : tool);

  const selectedPredicate = (value: EnToolItem) => value === selectedItem;
  const uploadOnClick = () => uploadRef.current && uploadRef.current.click();
  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const video = e.target.files[0];
      uploadVideo(video);
    }
  };
  const uploadRef = useRef<HTMLInputElement>(null);

  const undoDisabled = stack.length <= 1;

  return (
    <S.Container>
      <ToolItem
        icon={playState === EnVideoPlayState.PLAYING ? faPause : faPlay}
        name={playState === EnVideoPlayState.PLAYING ? 'Pause' : 'Play'}
        value={EnToolItem.PLAYSTATE}
        onClick={videoStateHandler}
      />
      <ToolItem icon={faUpload} name={'Upload'} value={EnToolItem.UPLOAD} onClick={uploadOnClick} />
      <S.UploadHiddenInput ref={uploadRef} type='file' accept='video/*' onChange={onFileUpload} />
      <ToolItem
        predicate={selectedPredicate}
        icon={faScissors}
        name={'Cut'}
        value={EnToolItem.CUT}
        onClick={cutVideo}
        disabled={trail.start === null || trail.end === null}
      />
      <ToolItem
        icon={faBackward}
        name={'Undo'}
        value={EnToolItem.UNDO}
        onClick={undo}
        disabled={undoDisabled}
      />
    </S.Container>
  );
};

export default Tools;
