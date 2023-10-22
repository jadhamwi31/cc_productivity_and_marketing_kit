import { useMeasure } from '@uidotdev/usehooks';
import { useEffect, useMemo, useRef } from 'react';
import { useVideoElement } from '../../../../hooks/useVideoElement';
import { useVideoStore } from '../../../../stores/video.store';
import Thumb, { ThumbEmitter } from '../Thumb/Thumb';
import { S } from './Ruler.styled';
import Tick from './Tick';

const getScale = (duration: number) => {
  if (duration <= 0) {
    throw new Error('Duration must be a positive number');
  }

  const scales = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  const durationThresholds = scales.map((scale) => scale * 60);

  for (let i = 0; i < durationThresholds.length; i++) {
    if (duration <= durationThresholds[i]) {
      return scales[i];
    }
  }

  return scales[scales.length - 1];
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export interface ITick {
  time: number;
  label: string;
  follow?: number;
}

type Props = {};

const Ruler = (props: Props) => {
  const { duration, thumbX, video, setWidth } = useVideoStore();

  const thumbXRef = useRef(thumbX);
  useEffect(() => {
    thumbXRef.current = thumbX;
  }, [thumbX]);

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const ticks = useMemo((): ITick[] => {
    if (duration && width) {
      const scale = getScale(duration);
      const numberOfTicks = Math.ceil(duration / scale);

      return new Array(numberOfTicks).fill(0).map(
        (_, index): ITick => ({
          time: scale * index,
          label: formatTime(scale * index),
          follow:
            index === numberOfTicks - 1
              ? Math.ceil((scale * index) / duration)
              : Math.floor(scale) - 1,
        }),
      );
    } else {
      return [];
    }
  }, [video, duration]);

  const videoElement = useVideoElement();
  useEffect(() => {
    if (width) setWidth(width);
  }, [width]);

  useEffect(() => {
    if (videoElement && width && duration) {
      const handler = () => {
        const newValue = (thumbXRef.current / width) * duration;
        videoElement.currentTime = newValue;
        videoElement.play();
      };

      ThumbEmitter.on('drag', handler);
      return () => {
        ThumbEmitter.off('drag', handler);
      };
    }
  }, [video, videoElement, width, duration]);

  return (
    <S.Wrapper id='ruler' ref={ref}>
      <S.Container>
        {ticks.map((tick) => (
          <Tick tick={tick} key={tick.time} />
        ))}
      </S.Container>
      <Thumb parentWidth={width} />
    </S.Wrapper>
  );
};

export default Ruler;
