import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { axios } from '../lib/axios';
import { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants/constants';
import { EnVideoPlayback } from '../ts/enums/video.enums';

export interface IVideoTab {
  videoUrl: string | null;
  videoId: string | null;
  currentTime: number;
  duration: number;
  currentDuration: number;
}

interface IVideosStore {
  tabs: { [tabId: string]: IVideoTab };
  addTab: () => void;
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
  uploadFile: (file: File) => Promise<void>;
  playback: EnVideoPlayback;
  setPlayback: (playback: EnVideoPlayback) => void;
  updateVideoCurrentTime: (newTime: number) => void;
  updateVideoDuration: (duration: number) => void;
  setVideoDuration: (duration: number) => void;
}

const INITIAL_TAB_ID = uuid();

export const useVideosStore = create<IVideosStore>((set, get) => ({
  tabs: {
    [INITIAL_TAB_ID]: {
      videoUrl: null,
      videoId: null,
      currentTime: 0,
      currentDuration: 0,
      duration: 0,
    },
  },
  addTab: () => {
    const newTabs = { ...get().tabs };
    const tabId = uuid();
    newTabs[tabId] = {
      videoUrl: null,
      videoId: null,
      currentTime: 0,
      duration: 0,
      currentDuration: 0,
    };
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
    newTabs[currentTab].videoId = filename;
    set({ tabs: newTabs });
  },
  playback: EnVideoPlayback.PAUSED,
  setPlayback: (playback) => set({ playback }),
  updateVideoCurrentTime: (newTime) => {
    const newTabs = { ...get().tabs };
    newTabs[get().selectedTab].currentTime = newTime;
    set({ tabs: newTabs });
  },

  updateVideoDuration: (duration) => {
    const newTabs = { ...get().tabs };
    newTabs[get().selectedTab].currentDuration = duration;
    set({ tabs: newTabs });
  },
  setVideoDuration: (duration) => {
    const newTabs = { ...get().tabs };
    newTabs[get().selectedTab].duration = duration;
    set({ tabs: newTabs });
  },
}));

export const selectCurrentTab = (state: IVideosStore) => state.tabs[state.selectedTab];