import { useCurrentTab } from '../../../hooks/useCurrentTab';
import { S } from './Transcribe.styled';

type Props = {};

const Transcribe = (props: Props) => {
  const tab = useCurrentTab();

  return (
    <S.Container>
      {tab.transcribing ? 'Transcribing' : tab.transcript.length !== 0 ? 'Timestamps...' : null}
    </S.Container>
  );
};

export default Transcribe;
