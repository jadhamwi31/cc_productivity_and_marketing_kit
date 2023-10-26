import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  border: solid 1px var(--blue);
  display: grid;
  place-items: center;
`;

const Video = styled.video`
  height: 250px;
  width: 100%;
`;

export const S = { Container, Video };
