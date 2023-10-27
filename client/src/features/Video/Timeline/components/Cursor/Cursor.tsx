import React from 'react';
import { S } from './Cursor.styled';

type Props = {};

const Cursor = (props: Props) => {
  return (
    <S.Container>
      <S.Relative>
        <S.Grabber />
      </S.Relative>
    </S.Container>
  );
};

export default Cursor;
