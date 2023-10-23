import { useEffect, useRef } from 'react';
import { useVideoStore } from '../../stores/video.store';
import Tools from '../Tools/Tools';
import { S } from './Player.styled';
import { EnVideoPlayback } from '../../ts/enums/video.enums';

type Props = {};

const Player = (props: Props) => {
  const { sources, setPlayback } = useVideoStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    (async () => {
      if (sources && videoRef.current) {
        for (const source of sources) {
          const video = videoRef.current;
          video.src = source.url;
          video.play();
          await new Promise((resolve) => {
            video.addEventListener('ended', resolve);
          });
        }
      }
    })();
  }, [sources]);
  return (
    <S.Container>
      <Tools />
      <S.VideoWrapper>
        <S.Video
          ref={videoRef}
          id='video-player'
          onPlay={() => setPlayback(EnVideoPlayback.PLAYING)}
          onPause={() => setPlayback(EnVideoPlayback.PAUSED)}
        />
      </S.VideoWrapper>
    </S.Container>
  );
};

export default Player;
