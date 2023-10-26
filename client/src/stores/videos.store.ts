import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { axios } from '../lib/axios';
import { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants/constants';

export interface IVideoTab {
  videoUrl: string | null;
}

interface IVideosStore {
  tabs: { [tabId: string]: IVideoTab };
  addTab: () => void;
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
  uploadFile: (file: File) => Promise<void>;
}

const INITIAL_TAB_ID = uuid();

export const useVideosStore = create<IVideosStore>((set, get) => ({
  tabs: { [INITIAL_TAB_ID]: { videoUrl: null } },
  addTab: () => {
    const newTabs = { ...get().tabs };
    const tabId = uuid();
    newTabs[tabId] = { videoUrl: null };
    set({ tabs: newTabs, selectedTab: tabId });
  },
  selectedTab: INITIAL_TAB_ID,
  setSelectedTab: (tabId) => {
    set({ selectedTab: tabId });
  },
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('video', file);
    const filename = await axios
      .post<{}, AxiosResponse<string>>('/videos', formData)
      .then(({ data }) => data);
    const currentTab = get().selectedTab;
    const newTabs = { ...get().tabs };
    newTabs[currentTab].videoUrl = `${BASE_URL}/storage/videos/${filename}`;
    console.log(newTabs);

    set({ tabs: newTabs });
  },
}));

export const selectCurrentTab = (state: IVideosStore) => state.tabs[state.selectedTab];
