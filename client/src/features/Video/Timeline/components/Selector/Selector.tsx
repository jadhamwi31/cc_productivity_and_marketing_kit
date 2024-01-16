import { useEffect, useState } from 'react';
import { useCurrentTab } from '../../../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../../../stores/videos.store';
import { S } from './Selector.styled';

type Props = { containerHeight: number; wrapperWidth: number };

const Selector = ({ containerHeight, wrapperWidth }: Props) => {
  const { selectedTab } = useVideosStore();
  const tab = useCurrentTab();
  const [markers, setMarkers] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [currentPosition, setCurrentPosition] = useState(0);
  const [coverWidth, setCoverWidth] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { updateTab } = useVideosStore();
  useEffect(() => {
    setMarkers({ start: 0, end: 0 });
    setCoverWidth(0);
  }, [selectedTab]);

  return (
    <S.Container
      onMouseDown={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;

        setCoverWidth(0);
        setMarkers({ end: 0, start: x });
        updateTab({ selectorStart: (x / wrapperWidth) * tab.duration - 1 });
        setIsMouseDown(true);
      }}
      onMouseUp={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setMarkers({ ...markers, end: x });
        updateTab({ selectorEnd: (x / wrapperWidth) * tab.duration - 1 });
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
