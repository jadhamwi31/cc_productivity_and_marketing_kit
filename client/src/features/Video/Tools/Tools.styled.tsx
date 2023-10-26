import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px var(--blue);
  border-radius: var(--border-radius);
  padding: 1em;
`;

const UploadHidden = styled.input`
  display: none;
`;

export const S = { Container, UploadHidden };
