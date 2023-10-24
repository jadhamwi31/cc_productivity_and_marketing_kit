import styled from 'styled-components';
const Container = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  gap: 0.25em;
  position: relative;
`;

const LineElement = styled.div`
  height: fit-content;
  width: fit-content;
  background-color: var(--blue);
  color: var(--white);
  height: 75px;
  border-radius: var(--border-radius);
  display: block;

  place-items: center;
  padding: 0.5em;
`;

export const S = { Container, VideoElement: LineElement };
