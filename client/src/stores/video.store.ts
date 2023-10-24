import { create } from 'zustand';
import { EnVideoPlayback } from '../ts/enums/video.enums';
import { durationToTimestamp } from '../utils/utils';

export interface ISource {
  mimeType: string;
  url: string;
  id: string;
  duration: number;
}

export interface ITimelineEvent {
  sourceId: string;
  start: string;
  end: string;
  sourceType: string;
}

interface IVideoStore {
  sources: ISource[];
  addSources: (sources: ISource[]) => void;
  playback: EnVideoPlayback;
  setPlayback: (playback: EnVideoPlayback) => void;
  events: ITimelineEvent[];
  updateEvent: (sourceId: string, data: Omit<ITimelineEvent, 'sourceId'>) => void;
}

export const useVideoStore = create<IVideoStore>((set, get) => ({
  sources: [],
  addSources: (sources) => {
    const newEvents = [...get().events];
    newEvents.push(
      ...sources.map(
        (source): ITimelineEvent => ({
          sourceId: source.id,
          start: '00:00',
          end: durationToTimestamp(source.duration),
          sourceType: source.mimeType,
        }),
      ),
    );
    set({ sources: [...get().sources, ...sources], events: newEvents });
  },
  playback: EnVideoPlayback.PAUSED,
  setPlayback: (playback) => set({ playback }),
  events: [],
  updateEvent(sourceId, data) {},
}));
