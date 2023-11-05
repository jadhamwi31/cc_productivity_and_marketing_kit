import { useVideosStore } from '../stores/videos.store';

export const useCurrentTab = () => {
  const { tabs, selectedTab } = useVideosStore();

  return tabs[selectedTab];
};
