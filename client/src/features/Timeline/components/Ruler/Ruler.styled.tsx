import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 2px;
  border-radius: var(--border-radius);
  background-color: var(--blue);
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2em;
  position: sticky;
  top: 0;
`;

const Timestamp = styled.div`
  position: relative;
  top: -1em;
  font-size: 10px;
  transition: all 0.15s ease;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const TimestampSegmentTick = styled.div`
  height: 2px;
  width: 2px;
  background-color: white;
  position: relative;
  border-radius: 100%;
  top: -0.5em;
`;

export const S = { Container, Timestamp, TimestampSegmentTick };
