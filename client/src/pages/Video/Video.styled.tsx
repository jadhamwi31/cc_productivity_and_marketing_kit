import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 0.4fr 1fr 0.6fr 4fr;
  gap: 0.5em;
`;

const PlayerToolsTranscriptRow = styled.div`
  display: grid;
  grid-template-columns: 0.1fr repeat(2, 1fr);
  width: 100%;
  gap: 0.5em;
  padding: 0.5em;
`;

export const S = { Container, PlayerToolsTranscriptRow };
