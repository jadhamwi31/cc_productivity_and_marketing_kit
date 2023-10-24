import { Resizable } from 're-resizable';
import styled from 'styled-components';

const LineElement = styled.div`
  height; 100%;
  width: 100%;
  color: var(--white);
  height: 50px;
  border-radius: var(--border-radius);
  display: grid;
  
  place-items: center;

  background-color:rgba(0,0,0,0.2);
  border-radius:var(--border-radius);
    
  `;

const ResizableWrapper = styled.div`
  background-color: var(--blue);
  border-radius: var(--border-radius);
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  position: relative;
`;

const ResizeElementContainer = styled.div<{
  $resizeType: 'tiny' | 'normal';
  $direction: 'left' | 'right';
}>`
  width: fit-content;
  height: 35%;
  display: flex;
  flex-direction: row;
  gap: 0.2em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: col-resize;
  overflow-x: hidden;
  ${({ $resizeType, $direction }) =>
    $resizeType === 'normal'
      ? $direction === 'left'
        ? 'left:5px'
        : 'right:5px'
      : $direction === 'left'
      ? 'left:-5px'
      : 'right:-5px'};
  ${({ $resizeType }) => ($resizeType === 'normal' ? 'opacity:1' : 'opacity:0')}
`;

const ResizeElement = styled.div`
  height: 100%;
  width: 0px;
  border-radius: 20px;
  border: solid 2px rgba(255, 255, 255, 0.3);
`;

export const S = { LineElement, ResizableWrapper, ResizeElement, ResizeElementContainer };
