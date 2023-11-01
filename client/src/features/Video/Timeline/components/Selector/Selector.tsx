import React, { useState } from 'react';
import { S } from './Selector.styled';
import { useTabStore } from '../../../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../../../stores/videos.store';

type Props = { containerHeight: number; wrapperWidth: number };

const Selector = ({ containerHeight, wrapperWidth }: Props) => {
  const tab = useTabStore();
  const [markers, setMarkers] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [currentPosition, setCurrentPosition] = useState(0);
  const [coverWidth, setCoverWidth] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { setSelectorStart, setSelectorEnd } = useVideosStore();

  console.log((markers.start / wrapperWidth) * tab.duration - 1);

  return (
    <S.Container
      onMouseDown={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;

        setCoverWidth(0);
        setMarkers({ end: 0, start: x });
        setSelectorStart((x / wrapperWidth) * tab.duration - 1);
        setIsMouseDown(true);
      }}
      onMouseUp={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setMarkers({ ...markers, end: x });
        setSelectorEnd((x / wrapperWidth) * tab.duration - 1);
        setIsMouseDown(false);
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setCurrentPosition(x);
        if (isMouseDown) setCoverWidth(Math.abs(x - markers.start));
      }}
    >
      {markers.start !== 0 && <S.Marker style={{ height: containerHeight, left: markers.start }} />}
      {markers.end !== 0 && <S.Marker style={{ height: containerHeight, left: markers.end }} />}
      {currentPosition !== 0 && (
        <S.Marker style={{ height: containerHeight, left: currentPosition }} />
      )}
      {coverWidth !== 0 && (
        <S.Cover
          style={{
            left: isMouseDown
              ? markers.start > currentPosition
                ? currentPosition
                : markers.start
              : markers.start > markers.end
              ? markers.end
              : markers.start,
            height: containerHeight,
            width: coverWidth,
          }}
        />
      )}
    </S.Container>
  );
};

export default Selector;
