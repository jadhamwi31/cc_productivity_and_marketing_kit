import { S } from './Timeline.styled';
import Lines from './components/Lines/Lines';
import Ruler from './components/Ruler/Ruler';

type Props = {};

const Timeline = (props: Props) => {
  return (
    <S.Container>
      <Ruler />
      <S.Timelines>
        <Lines />
      </S.Timelines>
    </S.Container>
  );
};

export default Timeline;
