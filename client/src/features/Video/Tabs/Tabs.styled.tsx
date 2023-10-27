import styled from 'styled-components';

const Container = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25em 0.5em;
  height: 30px;
  gap: 0.5em;
  background-color: var(--black);
  padding: 1em;
  border-radius: var(--border-radius);
`;

export const S = { Container };
