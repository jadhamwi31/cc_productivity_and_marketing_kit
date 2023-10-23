import { create } from 'zustand';
import { EnVideoPlayback } from '../ts/enums/video.enums';

export interface ISource {
  mimeType: string;
  url: string;
  id: string;
  duration: number;
}

interface IVideoStore {
  sources: ISource[];
  addSources: (sources: ISource[]) => void;
  playback: EnVideoPlayback;
  setPlayback: (playback: EnVideoPlayback) => void;
}

export const useVideoStore = create<IVideoStore>((set, get) => ({
  sources: [],
  addSources: (sources) => set({ sources: [...get().sources, ...sources] }),
  playback: EnVideoPlayback.PAUSED,
  setPlayback: (playback) => set({ playback }),
}));
