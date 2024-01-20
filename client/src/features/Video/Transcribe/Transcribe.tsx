import { useCurrentTab } from '../../../hooks/useCurrentTab';
import Chunks from './Chunks/Chunks';
import { S } from './Transcribe.styled';
import React from "react";

type Props = {};

const Transcribe = (props: Props) => {
  const tab = useCurrentTab();

  return (
    <S.Container>
      {tab.transcribing ? (
        'Transcribing'
      ) : tab.transcript ? (
        <Chunks chunks={tab.transcript.chunks} />
      ) : null}
    </S.Container>
  );
};

export default Transcribe;
