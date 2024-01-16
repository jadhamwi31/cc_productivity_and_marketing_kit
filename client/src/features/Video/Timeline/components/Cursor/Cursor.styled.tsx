import styled from 'styled-components';

const Container = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  width: 1px;
  background-color: var(--blue);
  position: absolute;
  top: -2.1em;
  z-index: 10;
`;

const Relative = styled.div`
  position: relative;
`;

const Grabber = styled.div`
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  cursor: grab;
  background-color: var(--blue);
  transform: translateX(-50%);
  border-radius: 2px;
`;

export const S = { Container, Grabber, Relative };
