import styled from 'styled-components';

const Primary = styled.button`
  border: none;
  outline: none;
  padding: 0.25em 0.5em;
  color: var(--white);
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    background-color: #4f245f;
  }
  &:disabled {
    opacity: 0.5;
  }
`;
const Secondary = styled.button`
  border: none;
  outline: none;
  padding: 0.25em 0.5em;
  background-color: transparent;
  color: var(--white);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export const S = { Primary, Secondary };
