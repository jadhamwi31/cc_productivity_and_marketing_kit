import React, { useState } from 'react';
import { S } from './Ruler.styled';
import { useTabStore } from '../../../../../hooks/useCurrentTab';
import { useMeasure } from '@uidotdev/usehooks';

type Props = {};

const Ruler = (props: Props) => {
  const tab = useTabStore();
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return <S.Container ref={ref} />;
};

export default Ruler;
