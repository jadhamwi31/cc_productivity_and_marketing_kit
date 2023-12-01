import React from 'react';
import { useVideosStore } from '../../../stores/videos.store';
import { S } from './Tabs.styled';
import Button from '../../../components/Button/Button';
import { FaPlus } from 'react-icons/fa6';
type Props = {};

const Tabs = (props: Props) => {
  const { tabs, setSelectedTab, selectedTab, addTab } = useVideosStore();
  return (
    <S.Container>
      {Object.keys(tabs).map((tabId, i) => (
        <button
          onClick={() => setSelectedTab(tabId)}
          key={tabId}
          style={{
            backgroundColor: selectedTab === tabId ? '#2A2438' : '',
            textAlign: 'left',
            width: '170px',
            padding: '5px',
          }}
        >
          Tab {i + 1}
        </button>
      ))}
      <Button onClick={addTab}>
        <FaPlus size={20} />
      </Button>
    </S.Container>
  );
};

export default Tabs;
