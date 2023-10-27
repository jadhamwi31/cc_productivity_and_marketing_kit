import { S } from './Timeline.styled';
import Cursor from './components/Cursor/Cursor';
import Line from './components/Line/Line';

type Props = {};

const Timeline = (props: Props) => {
  return (
    <S.Container>
      <Cursor />
      <Line />
    </S.Container>
  );
};

export default Timeline;
