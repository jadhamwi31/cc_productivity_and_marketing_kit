import { create } from 'zustand';
import { EnVideoPlayState } from '../ts/enums/video.enums';

interface IVideoStore {
  stack: string[];
  video: string | null;
  uploadVideo: (video: File) => Promise<void>;
  duration: number | null;
  setDuration: (duration: number | null) => void;
  time: number | null;
  setTime: (time: number | null) => void;
  playState: EnVideoPlayState;
  setPlayState: (state: EnVideoPlayState) => void;
  thumbX: number;
  setThumbX: (x: number) => void;
  trail: { start: number | null; end: number | null };
  setTrailStart: (start: number | null) => void;
  setTrailEnd: (end: number | null) => void;
  width: number;
  setWidth: (width: number) => void;
}

export const useVideoStore = create<IVideoStore>((set, get) => ({
  stack: [],
  video: null,
  width: 0,
  setWidth: (width) => set({ width }),
  uploadVideo: async (video) => {
    set({
      video: URL.createObjectURL(video),
    });
  },
  duration: null,
  setDuration: (duration) => set({ duration }),
  time: null,
  setTime: (time) => set({ time }),
  playState: EnVideoPlayState.PAUSED,
  setPlayState: (state) => set({ playState: state }),
  thumbX: 0,
  setThumbX: (x) => set({ thumbX: x }),
  trail: { start: null, end: null },
  setTrailStart: (start) => set({ trail: { ...get().trail, start } }),
  setTrailEnd: (end) => set({ trail: { ...get().trail, end } }),
}));
