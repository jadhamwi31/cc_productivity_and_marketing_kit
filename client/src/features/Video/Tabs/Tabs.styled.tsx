import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #15121c;
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.25em 0.5em;
`;

export const S = { Container, TabContent };
