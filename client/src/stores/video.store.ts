import { create } from "zustand";
import { EnVideoPlayState } from "../ts/enums/video.enums";

interface IVideoStore {
	video: File | null;
	setVideo: (video: File | null) => void;
	duration: number | null;
	setDuration: (duration: number | null) => void;
	time: number | null;
	setTime: (time: number | null) => void;
	playState: EnVideoPlayState;
	setPlayState: (state: EnVideoPlayState) => void;
	fullScreen: boolean;
	setFullscreen: (val: boolean) => void;
}

export const useVideoStore = create<IVideoStore>((set) => ({
	video: null,
	setVideo: (video) => set({ video }),
	duration: null,
	setDuration: (duration) => set({ duration }),
	time: null,
	setTime: (time) => set({ time }),
	playState: EnVideoPlayState.PAUSED,
	setPlayState: (state) => set({ playState: state }),
	fullScreen: false,
	setFullscreen: (val) => set({ fullScreen: val }),
}));
