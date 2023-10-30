import React, { useEffect, useRef, useState } from 'react';
import { S } from './Cursor.styled';
import { useTabStore } from '../../../../../hooks/useCurrentTab';
import Draggable from 'react-draggable';
import { useVideosStore } from '../../../../../stores/videos.store';
import { EnVideoPlayback } from '../../../../../ts/enums/video.enums';
import { useVideoElement } from '../../../../../hooks/useVideoElement';

type Props = { containerHeight: number };

const Cursor = ({ containerHeight }: Props) => {
  const [progress, setProgress] = useState(0);
  const tab = useTabStore();
  const videoElement = useVideoElement();
  const { setPlayback, playback, updateVideoCurrentTime } = useVideosStore();

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
        }}
        onStop={() => {
          if (shouldPlay.current) setPlayback(EnVideoPlayback.PLAYING);
        }}
        onDrag={(_, dragEvent) => {
          const newTime = (dragEvent.x / tab.lineWidth) * tab.duration;
          if (videoElement) {
            videoElement.currentTime = newTime;
            updateVideoCurrentTime(newTime);
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
