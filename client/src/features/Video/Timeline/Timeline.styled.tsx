import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-top: solid 1px #0e0e0e;
  padding: 2em;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const Wrapper = styled.div`
  width: 100%;

  height: 100%;
  position: relative;
`;

export const S = { Container, Wrapper };
