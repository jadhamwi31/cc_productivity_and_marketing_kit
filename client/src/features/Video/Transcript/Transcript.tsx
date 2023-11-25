import React from 'react';
import { S } from './Transcript.styled';
import { useCurrentTab } from '../../../hooks/useCurrentTab';

type Props = {};

const Transcript = (props: Props) => {
  const tab = useCurrentTab();
  return <S.Container>{tab.exporting && 'Exporting...'}</S.Container>;
};

export default Transcript;
