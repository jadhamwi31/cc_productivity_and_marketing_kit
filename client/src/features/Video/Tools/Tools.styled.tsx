import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  gap: 0.2em;
  font-size: 15px;
`;

const UploadHidden = styled.input`
  display: none;
`;

export const S = { Container, UploadHidden };
