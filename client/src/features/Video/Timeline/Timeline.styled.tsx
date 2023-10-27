import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-color: var(--black);
  border: solid 1px var(--blue);
  padding: 2em;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const S = { Container };
