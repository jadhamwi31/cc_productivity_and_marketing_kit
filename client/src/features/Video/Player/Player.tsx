import { useEffect, useRef } from 'react';
import { useTabStore as useCurrentTab } from '../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../stores/videos.store';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';
import { S } from './Player.styled';

type Props = {};

const Player = (props: Props) => {
  const tab = useCurrentTab();
  const { playback, setPlayback, updateVideoCurrentTime, updateVideoDuration } = useVideosStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    setPlayback(EnVideoPlayback.PAUSED);
    if (videoRef.current) videoRef.current.currentTime = tab.currentTime;
  }, [tab]);
  useEffect(() => {
    if (playback === EnVideoPlayback.PLAYING) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [playback]);

  useEffect(() => {
    const timeUpdateHandler = () => {
      if (videoRef.current) updateVideoCurrentTime(videoRef.current.currentTime);
    };
    const intervalId = setInterval(timeUpdateHandler, 1);
    return () => {
      clearInterval(intervalId);
    };
  }, [tab, playback]);

  const onLoadHandler = () => {
    if (videoRef.current && tab.isNew) {
      const video = videoRef.current;
      updateVideoCurrentTime(0);
      updateVideoDuration(video.duration);
    }
  };

  return (
    <S.Container>
      <S.Video
        id='video-player'
        ref={videoRef}
        onPlay={() => setPlayback(EnVideoPlayback.PLAYING)}
        onPause={() => {
          setPlayback(EnVideoPlayback.PAUSED);
        }}
        onLoadedMetadata={onLoadHandler}
        onLoadedData={onLoadHandler}
        onLoad={onLoadHandler}
        src={tab.videoUrl ?? ''}
      />
    </S.Container>
  );
};

export default Player;
