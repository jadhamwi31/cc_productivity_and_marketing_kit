import { AxiosError, AxiosResponse } from 'axios';
import fileDownload from 'js-file-download';
import JSZip from 'jszip';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { axios } from '../lib/axios';
import { EnVideoPlayback } from '../ts/enums/video.enums';
import { Transcript } from '../ts/types/video.types';

export type SavedTab = Pick<
  IVideoTab,
  'partitions' | 'videoName' | 'transcript' | 'transcriptsUsed'
>;

export interface IVideoPartition {
  start: number;
  end: number;
  fromTranscript?: boolean;
}

type TabHistory = Pick<IVideoTab, 'partitions'>;

export enum EnLanguage {
  ENGLISH = 'english',
  ARABIC = 'arabic',
}

export interface IVideoTab {
  videoUrl: string | null;
  videoId: string | null;
  currentTime: number;
  duration: number;
  videoName: string;
  lineWidth: number;
  selectorStart: number;
  selectorEnd: number;
  isNew: boolean;
  partitions: IVideoPartition[];
  isCursorGrabbed: boolean;
  undo: TabHistory[];
  redo: TabHistory[];
  uploadProgress: number | null;
  downloading: boolean;
  transcribing: boolean;
  transcript: Transcript | null;
  transcriptsUsed: string[];
  language: EnLanguage;
  file: File | null;
}

interface IVideosStore {
  tabs: { [tabId: string]: IVideoTab };
  addTab: () => void;
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
  uploadFile: (file: File) => Promise<IVideoTab>;
  playback: EnVideoPlayback;
  setPlayback: (playback: EnVideoPlayback) => void;
  cut: () => Promise<void>;
  updateTab: (values: Partial<IVideoTab>) => void;
  undo: () => void;
  redo: () => void;
  downloadVideo: () => void;
  transcribe: () => void;
  cutFromTo: (from: number, to: number) => void;
  uncutFromTo: (from: number, to: number) => void;
  setEnglishLanguage: () => void;
  setArabicLanguage: () => void;
  saveTab: () => Promise<void>;
  importSavedTab: (file: File) => Promise<void>;
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
  transcribing: false,
  isNew: false,
  partitions: [],
  isCursorGrabbed: false,
  undo: [{ partitions: [] }],
  redo: [{ partitions: [] }],
  uploadProgress: null,
  downloading: false,
  transcriptsUsed: [],
  transcript: null,
  videoName: '',
  language: EnLanguage.ENGLISH,
  file: null,
};

export const useVideosStore = create<IVideosStore>((set, get) => ({
  tabs: {
    [INITIAL_TAB_ID]: { ...DEFAULT_TAB_VALUES },
  },
  setEnglishLanguage: () => {
    const newTabs = { ...get().tabs };
    const currentTab = get().selectedTab;
    newTabs[currentTab].language = EnLanguage.ENGLISH;
  },
  setArabicLanguage: () => {
    const newTabs = { ...get().tabs };
    const currentTab = get().selectedTab;
    newTabs[currentTab].language = EnLanguage.ARABIC;
  },
  addTab: () => {
    const newTabs = { ...get().tabs };
    const tabId = uuid();

    newTabs[tabId] = { ...DEFAULT_TAB_VALUES };
    console.log(newTabs);

    set({ tabs: newTabs, selectedTab: tabId });
  },

  selectedTab: INITIAL_TAB_ID,
  setSelectedTab: (tabId) => {
    set({ selectedTab: tabId });
  },
  uploadFile: async (file) => {
    const formData = new FormData();
    console.log(file);

    const currentTab = get().selectedTab;
    formData.append('video', file);

    const newTabs = { ...get().tabs };

    const uploadToastId = toast('Uploading Progress : 0%', { progress: 0, autoClose: false });
    axios
      .post<void, AxiosResponse<string>>('/videos', formData, {
        onUploadProgress(progressEvent) {
          const newProgress = progressEvent.progress! * 100;

          if (newProgress === 100) {
            toast.update(uploadToastId, {
              render: `Video Uploaded`,
            });
          } else {
            toast.update(uploadToastId, {
              render: `Uploading Progress : ${newProgress.toFixed(0)}%`,
            });
          }
          newTabs[currentTab].uploadProgress = newProgress;
          set({ tabs: newTabs });
        },
      })
      .then(({ data }) => data)
      .then((videoId) => {
        newTabs[currentTab].videoId = videoId;
        newTabs[currentTab].videoName = file.name;

        set({ tabs: newTabs });
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.status === 413) {
            toast.error('File too Large', { toastId: uploadToastId });
          } else {
            toast.error('An error has occured', { toastId: uploadToastId });
          }
        }
      });

    newTabs[currentTab].videoUrl = URL.createObjectURL(file);
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].isNew = true;
    newTabs[currentTab].file = file;

    set({ tabs: newTabs });
    return newTabs[currentTab];
  },
  cut: async () => {
    const currentTab = get().selectedTab;
    const newTabs = { ...get().tabs };
    const { selectorStart, selectorEnd } = newTabs[currentTab];
    const start = selectorStart > selectorEnd ? selectorEnd : selectorStart;
    const end = selectorStart < selectorEnd ? selectorEnd : selectorStart;
    const tab = newTabs[currentTab];

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
  downloadVideo: () => {
    const tabs = { ...get().tabs };
    const currentTab = tabs[get().selectedTab];
    currentTab.downloading = true;
    set({ tabs });
    toast.promise(
      axios
        .post(`/videos/${currentTab.videoId}/export`, currentTab.partitions, {
          responseType: 'blob',
        })
        .then(({ data }) => {
          fileDownload(data, `${currentTab.videoId}.mp4`);
        })
        .finally(() => {
          currentTab.downloading = false;
          set({ tabs });
        }),
      {
        pending: `Exporting Video ${currentTab.videoName}`,
        error: 'An Error Has Occured',
        success: `Video ${currentTab.videoName} Exported`,
      },
    );
  },
  transcribe() {
    const tabs = { ...get().tabs };
    const currentTab = tabs[get().selectedTab];
    currentTab.transcribing = true;
    set({ tabs });
    axios
      .get(`/videos/${currentTab.videoId}/transcript?lang=${currentTab.language}`)
      .then(({ data }) => {
        currentTab.transcript = data;
        set({ tabs });
      })
      .finally(() => {
        currentTab.transcribing = false;
        set(tabs);
      });
  },
  cutFromTo(from, to) {
    const currentTab = get().selectedTab;
    const newTabs = { ...get().tabs };

    const tab = newTabs[currentTab];

    newTabs[currentTab].undo.push({ partitions: [...tab.partitions] });
    newTabs[currentTab].partitions = [
      ...newTabs[currentTab].partitions,
      { fromTranscript: true, start: from, end: to },
    ];
    set({ tabs: newTabs });
  },
  uncutFromTo(from, to) {
    const currentTab = get().selectedTab;
    const newTabs = { ...get().tabs };

    const tab = newTabs[currentTab];

    newTabs[currentTab].undo.push({ partitions: [...tab.partitions] });
    newTabs[currentTab].partitions = [...newTabs[currentTab].partitions].filter(
      (partition) => partition.start !== from && partition.end !== to,
    );
    set({ tabs: newTabs });
  },
  saveTab: async () => {
    const tab = get().tabs[get().selectedTab];
    if (!tab.file) return;
    // Video
    const buffer = await tab.file.arrayBuffer();
    const videoBlob = new Blob([buffer]);

    // Project
    const savedTab: SavedTab = _.pick(tab, [
      'partitions',
      'transcript',
      'transcriptsUsed',
      'videoName',
    ]);

    const name = tab.videoName.replace('.mp4', '');
    const zip = new JSZip();
    const folder = zip.folder(name);
    folder?.file('project.json', JSON.stringify(savedTab));
    folder?.file('video.bin', videoBlob);
    const zipped = await folder?.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipped!);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.rar`;
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  importSavedTab: async (file) => {
    const zip = new JSZip();
    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer]);

    zip.loadAsync(blob).then(async function (zip) {
      const folder = zip.folder(file.name);
      if (folder) {
        const projectFile = folder.files['project.json'];
        const videoFile = folder.files['video.bin'];

        if (projectFile && videoFile) {
          const projectJsonData = JSON.parse(await projectFile.async('text')) as SavedTab;
          const videoData = await videoFile.async('arraybuffer');
          const videoBlob = new Blob([videoData], { type: 'video/mp4' });
          const videoFileObject = new File([videoBlob], projectJsonData.videoName);
          const newTabs = { ...get().tabs };

          get()
            .uploadFile(videoFileObject)
            .then(async () => {
              newTabs[get().selectedTab].partitions = projectJsonData.partitions;

              newTabs[get().selectedTab].videoName = projectJsonData.videoName;
              newTabs[get().selectedTab].transcript = projectJsonData.transcript;
              newTabs[get().selectedTab].transcriptsUsed = projectJsonData.transcriptsUsed;
              set({ tabs: newTabs });
            });
        }
      }
    });
  },
}));

export const selectCurrentTab = (state: IVideosStore) => state.tabs[state.selectedTab];
