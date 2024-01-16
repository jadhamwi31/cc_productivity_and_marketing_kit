import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useCurrentTab } from '../../../../../hooks/useCurrentTab';
import { useVideoElement } from '../../../../../hooks/useVideoElement';
import { useVideosStore } from '../../../../../stores/videos.store';
import { EnVideoPlayback } from '../../../../../ts/enums/video.enums';
import { S } from './Cursor.styled';

type Props = { containerHeight: number };

const Cursor = ({ containerHeight }: Props) => {
  const [progress, setProgress] = useState(0);
  const tab = useCurrentTab();
  const videoElement = useVideoElement();
  const { setPlayback, playback, updateTab } = useVideosStore();

  useEffect(() => {
    const percentage = tab.currentTime / tab.duration;
    const pixels = percentage * tab.lineWidth;
    setProgress(pixels);
  }, [tab.currentTime, tab.duration, tab.lineWidth]);
  const shouldPlay = useRef(false);
  return (
    tab.videoId !== null && (
      <Draggable
        position={{ x: progress, y: 0 }}
        bounds='parent'
        axis='x'
        onStart={() => {
          shouldPlay.current = playback === EnVideoPlayback.PLAYING;
          setPlayback(EnVideoPlayback.PAUSED);
          updateTab({ isCursorGrabbed: true });
        }}
        onStop={() => {
          if (shouldPlay.current) setPlayback(EnVideoPlayback.PLAYING);
          updateTab({ isCursorGrabbed: false });
        }}
        onDrag={(_, dragEvent) => {
          // console.log(
          //   `Current Time : ${tab.currentTime}\nLine Width: ${tab.lineWidth}\nDuration : ${tab.duration}\nX : ${dragEvent.x}`,
          // );

          const newTime = tab.currentTime + dragEvent.deltaX * (tab.duration / tab.lineWidth);
          if (videoElement) {
            videoElement.currentTime = newTime;
            updateTab({ currentTime: newTime });
          }
        }}
      >
        <S.Container $height={containerHeight}>
          <S.Relative>
            <S.Grabber />
          </S.Relative>
        </S.Container>
      </Draggable>
    )
  );
};

export default Cursor;
