import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 1px;
  background-color: #2a2438;
  border-radius: var(--border-radius);
  position: absolute;
  top: -1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--blue);
  justify-content: space-between;
  font-size: 10px;
`;

const Timestamp = styled.label`
  position: relative;
  top: -1em;
  z-index: 15;
`;

export const S = { Container, Timestamp };
