import React from 'react';
import { useVideosStore } from '../../../stores/videos.store';
import { S } from './Tabs.styled';
import Button from '../../../components/Button/Button';

type Props = {};

const Tabs = (props: Props) => {
  const { tabs, setSelectedTab, selectedTab, addTab } = useVideosStore();
  return (
    <S.Container>
      {Object.keys(tabs).map((tabId, i) => (
        <Button
          onClick={() => setSelectedTab(tabId)}
          key={tabId}
          style={{ color: selectedTab === tabId ? 'var(--blue)' : 'var(--white)' }}
        >
          Tab {i + 1}
        </Button>
      ))}
      <Button onClick={addTab}>+</Button>
    </S.Container>
  );
};

export default Tabs;
