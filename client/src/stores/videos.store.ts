import { AxiosResponse } from 'axios';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { axios } from '../lib/axios';
import { EnVideoPlayback } from '../ts/enums/video.enums';

export interface IVideoPartition {
  start: number;
  end: number;
}

type TabHistory = Pick<IVideoTab, 'partitions'>;

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
  undo: TabHistory[];
  redo: TabHistory[];
  uploadProgress: number | null;
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
  undo: () => void;
  redo: () => void;
}

const INITIAL_TAB_ID = uuid();

const DEFAULT_TAB_VALUES: IVideoTab = {
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
  undo: [{ partitions: [] }],
  redo: [{ partitions: [] }],
  uploadProgress: null,
};

export const useVideosStore = create<IVideosStore>((set, get) => ({
  tabs: {
    [INITIAL_TAB_ID]: DEFAULT_TAB_VALUES,
  },
  addTab: () => {
    const newTabs = { ...get().tabs };
    const tabId = uuid();
    newTabs[tabId] = DEFAULT_TAB_VALUES;
    set({ tabs: newTabs, selectedTab: tabId });
  },
  selectedTab: INITIAL_TAB_ID,
  setSelectedTab: (tabId) => {
    set({ selectedTab: tabId });
  },
  uploadFile: async (file) => {
    const formData = new FormData();

    const currentTab = get().selectedTab;
    formData.append('video', file);

    const newTabs = { ...get().tabs };
    axios
      .post<{}, AxiosResponse<string>>('/videos', formData, {
        onUploadProgress(progressEvent) {
          if (progressEvent.progress) {
            const newProgress = progressEvent.progress * 100;
            newTabs[currentTab].uploadProgress = newProgress;
            set({ tabs: newTabs });
          }
        },
      })
      .then(({ data }) => data)
      .then((videoId) => {
        newTabs[currentTab].videoId = videoId;
        set({ tabs: newTabs });
      });

    newTabs[currentTab].videoUrl = URL.createObjectURL(file);
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].isNew = true;

    set({ tabs: newTabs });
  },
  cut: async () => {
    const currentTab = get().selectedTab;
    const newTabs = { ...get().tabs };
    const { selectorStart, selectorEnd } = newTabs[currentTab];
    const start = selectorStart > selectorEnd ? selectorEnd : selectorStart;
    const end = selectorStart < selectorEnd ? selectorEnd : selectorStart;
    const tab = newTabs[currentTab];
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].undo.push({ partitions: [...tab.partitions] });
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
  undo: () => {
    const newTabs = { ...get().tabs };
    const currentTab = get().selectedTab;
    const tab = newTabs[currentTab];

    newTabs[currentTab].redo.push({ partitions: [...tab.partitions] });
    const newState = newTabs[currentTab].undo.pop();
    newTabs[currentTab] = { ...newTabs[currentTab], ...newState };
    set({ tabs: newTabs });
  },
  redo: () => {
    const newTabs = { ...get().tabs };
    const currentTab = get().selectedTab;
    const tab = newTabs[currentTab];

    const newUndo: TabHistory = { partitions: [...tab.partitions] };
    const undos = [...newTabs[currentTab].undo, newUndo];
    const newState = newTabs[currentTab].redo.pop();

    newTabs[currentTab] = { ...newTabs[currentTab], ...newState, undo: undos };
    set({ tabs: newTabs });
  },
}));

export const selectCurrentTab = (state: IVideosStore) => state.tabs[state.selectedTab];
