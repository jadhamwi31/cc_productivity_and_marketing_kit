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
  lineWidth: number;
  selectorStart: number;
  selectorEnd: number;
  isNew: boolean;
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
  cut: () => Promise<void>;
  setLineWidth: (lineWidth: number) => void;
  setSelectorStart: (start: number) => void;
  setSelectorEnd: (start: number) => void;
}

const INITIAL_TAB_ID = uuid();

export const useVideosStore = create<IVideosStore>((set, get) => ({
  tabs: {
    [INITIAL_TAB_ID]: {
      videoUrl: null,
      videoId: null,
      currentTime: 0,
      selectorStart: 0,
      selectorEnd: 0,
      duration: 0,
      lineWidth: 0,
      isNew: false,
    },
  },
  addTab: () => {
    const newTabs = { ...get().tabs };
    const tabId = uuid();
    newTabs[tabId] = {
      videoUrl: null,
      selectorEnd: 0,
      selectorStart: 0,
      videoId: null,
      currentTime: 0,
      duration: 0,
      lineWidth: 0,
      isNew: false,
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
    newTabs[currentTab].videoUrl = `${BASE_URL}/storage/unknown/${filename}`;
    newTabs[currentTab].videoId = filename;
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].isNew = true;
    set({ tabs: newTabs });
  },
  cut: async () => {
    const currentTab = get().selectedTab;
    const { selectorStart, selectorEnd } = get().tabs[currentTab];

    const videoId = get().tabs[currentTab].videoId;
    const filename = await axios
      .post<{}, AxiosResponse<string>>(`/videos/${videoId?.split('.')[0]}/cut`, {
        start: selectorStart,
        end: selectorEnd,
      })
      .then(({ data }) => data);
    const newTabs = { ...get().tabs };
    newTabs[currentTab].videoUrl = `${BASE_URL}/storage/unknown/${filename}`;
    newTabs[currentTab].videoId = filename;
    newTabs[currentTab].currentTime = 0;

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
    newTabs[get().selectedTab].duration = duration;
    newTabs[get().selectedTab].isNew = false;
    set({ tabs: newTabs });
  },
  setLineWidth: (lineWidth) => {
    const newTabs = { ...get().tabs };
    newTabs[get().selectedTab].lineWidth = lineWidth;
    set({ tabs: newTabs });
  },
  setSelectorStart: (start) => {
    const newTabs = { ...get().tabs };
    newTabs[get().selectedTab].selectorStart = start;
    set({ tabs: newTabs });
  },
  setSelectorEnd: (end) => {
    const newTabs = { ...get().tabs };
    newTabs[get().selectedTab].selectorEnd = end;
    set({ tabs: newTabs });
  },
}));

export const selectCurrentTab = (state: IVideosStore) => state.tabs[state.selectedTab];
