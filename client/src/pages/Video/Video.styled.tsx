import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--black-lighter);
  display: grid;
  grid-template-rows: 0.1fr repeat(2, 1fr);
  padding: 1em;
  gap: 1em;
`;

const PlayerToolsTranscriptRow = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr;
  width: 100%;
  gap: 1em;
  & > div {
    background-color: var(--black);
  }
`;

export const S = { Container, PlayerToolsTranscriptRow };
