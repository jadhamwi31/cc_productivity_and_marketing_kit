import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  color: white;

  top: 0;
`;

const PartitionSection = styled.div`
  height: 100%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  top: -2.05em;
`;

const Connector = styled.div`
  cursor: not-allowed;
  position: absolute;
  top: -2.05em;
  background-color: rgba(255, 255, 255, 0.03);
  display: grid;
  place-items: center;
  & > div {
    z-index: 15;
  }
`;

export const S = { Connector, Container, PartitionSection };
