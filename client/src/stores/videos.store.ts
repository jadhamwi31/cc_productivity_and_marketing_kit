import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { axios } from '../lib/axios';
import { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants/constants';
import { EnVideoPlayback } from '../ts/enums/video.enums';
import _ from 'lodash';

export interface IVideoPartition {
  start: number;
  end: number;
}

export interface IVideoTab {
  videoUrl: string | null;
  videoId: string | null;
  currentTime: number;
  duration: number;
  lineWidth: number;
  selectorStart: number;
  selectorEnd: number;
  isNew: boolean;
  partitions: IVideoPartition[];
  isCursorGrabbed: boolean;
}

interface IVideosStore {
  tabs: { [tabId: string]: IVideoTab };
  addTab: () => void;
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
  uploadFile: (file: File) => Promise<void>;
  playback: EnVideoPlayback;
  setPlayback: (playback: EnVideoPlayback) => void;
  cut: () => Promise<void>;
  updateTab: (values: Partial<IVideoTab>) => void;
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
      partitions: [],
      isCursorGrabbed: false,
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
      partitions: [],

      isCursorGrabbed: false,
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
    const start = selectorStart > selectorEnd ? selectorEnd : selectorStart;
    const end = selectorStart < selectorEnd ? selectorEnd : selectorStart;
    const newTabs = { ...get().tabs };
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].partitions = [
      ...newTabs[currentTab].partitions,
      { start: start + 1, end: end + 1 },
    ];
    set({ tabs: newTabs });
  },
  playback: EnVideoPlayback.PAUSED,
  setPlayback: (playback) => set({ playback }),
  updateTab: (values) => {
    const newTabs = { ...get().tabs };

    for (const [key, value] of Object.entries(values)) {
      _.update(newTabs, [get().selectedTab, key], () => value);
    }
    set({ tabs: newTabs });
  },
}));

export const selectCurrentTab = (state: IVideosStore) => state.tabs[state.selectedTab];
