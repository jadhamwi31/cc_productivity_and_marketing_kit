import styled from 'styled-components';

const Container = styled.div<{ $isUsed: boolean }>`
  border-radius: 4px;
  border: solid 1px white;
  color: white;
  font-size: 12px;
  width: fit-content;
  padding: 0.5em;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ $isUsed }) => ($isUsed ? 'var(--blue)' : 'transparent')};
  &:hover {
    background-color: var(--blue);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5em;
  overflow-y: auto;
  height: 40vh;
`;

export const S = { Container, Wrapper };
