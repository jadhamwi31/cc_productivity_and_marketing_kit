import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../../components/Button/Button';
import { useVideosStore } from '../../../stores/videos.store';
import { S } from './Tabs.styled';
type Props = {};

const Tabs = (props: Props) => {
  const { tabs, setSelectedTab, selectedTab, addTab } = useVideosStore();
  const tabsToRender = Object.keys(tabs);
  return (
    <S.Container>
      {tabsToRender.map((tabId, i) => (
        <button
          onClick={() => setSelectedTab(tabId)}
          key={tabId}
          style={{
            backgroundColor: selectedTab === tabId ? '#2A2438' : '',
            textAlign: 'left',
            width: '170px',
            paddingLeft: '20px',
          }}
        >
          <S.TabContent>
            <div>Tab {i + 1}</div>
          </S.TabContent>
        </button>
      ))}
      <Button onClick={addTab}>
        <FaPlus size={20} />
      </Button>
    </S.Container>
  );
};

export default Tabs;
