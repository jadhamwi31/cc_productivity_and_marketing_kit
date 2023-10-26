import { useVideosStore } from '../stores/videos.store';

export const useTabStore = () => {
  const { tabs } = useVideosStore();
  const selectedTab = useVideosStore((state) => tabs[state.selectedTab]);
  return selectedTab;
};
