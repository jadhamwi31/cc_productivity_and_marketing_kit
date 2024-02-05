import React, { useEffect, useRef } from 'react';
import { useCurrentTab } from '../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../stores/videos.store';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';
import { S } from './Player.styled';

type Props = {};

const Player = (props: Props) => {
  const tab = useCurrentTab();
  const { playback, setPlayback, updateTab } = useVideosStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (blurVideoRef.current) {
      blurVideoRef.current.currentTime = tab.currentTime;
    }
  }, [tab.currentTime]);
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
      if (videoRef.current) {
        if (!tab.isCursorGrabbed) {
          const partitionFound = tab.partitions.find(
            (partition) =>
              partition.start < videoRef.current!.currentTime &&
              Number(partition.end.toFixed(0)) > Number(videoRef.current!.currentTime.toFixed(0)),
          );

          if (partitionFound) {
            videoRef.current.currentTime = partitionFound.end;
          }
        }
        updateTab({
          currentTime: videoRef.current.currentTime,
        });
      }
    };
    const intervalId = setInterval(timeUpdateHandler, 0);
    return () => {
      clearInterval(intervalId);
    };
  }, [tab, playback]);

  const onLoadHandler = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      updateTab({
        currentTime: 0,
        duration: video.duration,
        isNew: false,
      });
    }
  };

  return (
    <S.Container>
      <S.Video className='blur-2xl rounded-lg ' src={tab.videoUrl ?? ''} ref={blurVideoRef} />
      <S.Video
        className='absolute'
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
