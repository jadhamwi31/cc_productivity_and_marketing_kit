import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  border: solid 1px var(--blue);
  display: grid;
  place-items: center;

  position: relative;
`;

const Video = styled.video`
  height: 500px;
  width: 100%;
`;

const UploadProgressElement = styled.div`
  position: absolute;
  top: 0.5em;
  right: 1em;
  color: var(--blue);
  font-size: 12px;
`;

export const S = { Container, Video, UploadProgressElement };
