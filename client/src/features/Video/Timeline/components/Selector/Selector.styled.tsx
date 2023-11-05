import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  z-index: 4;
`;

const Marker = styled.div`
  width: 0px;
  position: absolute;
  top: -2.05em;
  border: dashed 1px var(--blue);
  pointer-events: none;
`;

const Cover = styled.div`
  background-color: rgba(255, 255, 255, 0.07);
  pointer-events: none;
  position: absolute;
  top: -2.05em;
`;

export const S = { Marker, Container, Cover };
