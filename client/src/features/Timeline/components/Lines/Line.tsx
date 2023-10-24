import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import { ITimelineEvent, useVideoStore } from '../../../../stores/video.store';
import { S } from './Line.styled';
import { useRef, useState } from 'react';

type Props = { event: ITimelineEvent; max: number };

const Line = ({ event, max }: Props) => {
  const bgColor = event.sourceType.startsWith('audio') ? 'var(--red)' : 'var(--blue)';
  const source = useVideoStore((state) =>
    state.sources.find((currentSource) => currentSource.id === event.sourceId),
  )!;

  const width = (source.duration / max) * 100;
  const resizeType = width > 15 ? 'normal' : 'tiny';
  const [draggable, setDraggable] = useState(true);
  const toggleDraggable = () => setDraggable((prev) => !prev);
  return (
    source && (
      <Draggable axis='x' bounds='parent' disabled={!draggable}>
        <S.LineElement className='handle' style={{ width: `${width}%`, backgroundColor: bgColor }}>
          <S.ResizableWrapper>
            <S.ResizeElementContainer
              onMouseEnter={toggleDraggable}
              onMouseLeave={toggleDraggable}
              $resizeType={resizeType}
              $direction={'left'}
            >
              <S.ResizeElement />
              <S.ResizeElement />
            </S.ResizeElementContainer>
            {event.sourceId}
            <S.ResizeElementContainer
              onMouseEnter={toggleDraggable}
              onMouseLeave={toggleDraggable}
              $resizeType={resizeType}
              $direction={'right'}
            >
              <S.ResizeElement />
              <S.ResizeElement />
            </S.ResizeElementContainer>
          </S.ResizableWrapper>
        </S.LineElement>
      </Draggable>
    )
  );
};

export default Line;
