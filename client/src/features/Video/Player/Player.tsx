import { useEffect, useRef } from 'react';
import { useTabStore as useCurrentTab } from '../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../stores/videos.store';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';
import { S } from './Player.styled';

type Props = {};

const Player = (props: Props) => {
  const tab = useCurrentTab();
  const { playback, setPlayback, updateVideoCurrentTime, setVideoDuration, updateVideoDuration } =
    useVideosStore();

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
    if (tab.videoId !== null && playback === EnVideoPlayback.PLAYING) {
      const timeUpdateHandler = () => {
        if (videoRef.current) updateVideoCurrentTime(videoRef.current.currentTime);
      };
      const intervalId = setInterval(timeUpdateHandler, 1);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [tab, playback]);

  return (
    <S.Container>
      {tab.videoUrl !== null && (
        <S.Video
          ref={videoRef}
          onPlay={() => setPlayback(EnVideoPlayback.PLAYING)}
          onPause={() => {
            setPlayback(EnVideoPlayback.PAUSED);
          }}
          onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration)}
          onLoadedData={(e) => updateVideoDuration(e.currentTarget.duration)}
          src={tab.videoUrl}
        />
      )}
    </S.Container>
  );
};

export default Player;