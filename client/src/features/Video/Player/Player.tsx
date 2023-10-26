import { useTabStore as useCurrentTab } from '../../../hooks/useCurrentTab';
import { S } from './Player.styled';

type Props = {};

const Player = (props: Props) => {
  const tab = useCurrentTab();
  return <S.Container>{tab.videoUrl !== null && <S.Video src={tab.videoUrl} />}</S.Container>;
};

export default Player;
