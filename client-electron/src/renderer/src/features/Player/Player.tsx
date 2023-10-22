import { useEffect, useMemo, useRef } from 'react';
import { useVideoStore } from '../../stores/video.store';
import { EnVideoPlayState } from '../../ts/enums/video.enums';
import Tools from '../Tools/Tools';
import { S } from './Player.styled';

type Props = {} & React.VideoHTMLAttributes<HTMLVideoElement>;

const Player = ({ ...playerProps }: Props) => {
  const { video, setDuration, setTime, setPlayState, playState } = useVideoStore();
  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const videoSrc = useMemo(() => video || undefined, [video]);
  useEffect(() => {
    if (playState === EnVideoPlayState.PLAYING && videoSrc) {
      const timePollHandler = () => {
        setTime(videoRef.current.currentTime);
      };
      const id = setInterval(timePollHandler, 1);
      return () => {
        clearInterval(id);
      };
    }
  }, [playState]);

  return (
    <S.Container>
      <Tools />
      <S.VideoWrapper>
        <S.Video
          ref={videoRef}
          id='video-player'
          src={videoSrc}
          {...playerProps}
          onLoadedMetadata={() => {
            setDuration(videoRef.current.duration);
          }}
          onDurationChange={() => {
            setDuration(videoRef.current.duration);
          }}
          onTimeUpdate={() => {
            setTime(videoRef.current.currentTime);
          }}
          onPlay={() => setPlayState(EnVideoPlayState.PLAYING)}
          onPause={() => setPlayState(EnVideoPlayState.PAUSED)}
        />
      </S.VideoWrapper>
      <div
        style={{
          backgroundColor: 'var(--black)',
          borderRadius: '4px',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--blue)',
          fontWeight: 'bold',
        }}
      >
        Transcript
      </div>
    </S.Container>
  );
};

export default Player;
