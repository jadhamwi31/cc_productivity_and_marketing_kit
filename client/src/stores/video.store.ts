import { create } from 'zustand';
import { EnVideoPlayState } from '../ts/enums/video.enums';
import { axios } from '../lib/axios';
import { BASE_URL } from '../constants/constants';

interface IVideoStore {
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
  cutVideo: (name: string, start: number, end: number) => Promise<void>;
}

export const useVideoStore = create<IVideoStore>((set) => ({
  video: null,
  uploadVideo: async (video) => {
    const data = new FormData();
    data.append('video', video);
    const name: string = await axios.post('/videos', data).then(({ data }) => data);
    set({ video: name });
  },
  cutVideo: async (name, start, end) => {
    await axios.post(`/videos/${name}/cut`, { start, end });
  },
  duration: null,
  setDuration: (duration) => set({ duration }),
  time: null,
  setTime: (time) => set({ time }),
  playState: EnVideoPlayState.PAUSED,
  setPlayState: (state) => set({ playState: state }),
  thumbX: 0,
  setThumbX: (x) => set({ thumbX: x }),
}));
