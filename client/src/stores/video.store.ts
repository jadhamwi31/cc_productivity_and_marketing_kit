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
	thumbX: number;
	setThumbX: (x: number) => void;
}

export const useVideoStore = create<IVideoStore>((set) => ({
	video: null,
	setVideo: (video) =>
		set({
			video,
			time: 0,
			playState: EnVideoPlayState.PAUSED,
			thumbX: 0,
			duration: 0,
		}),
	duration: null,
	setDuration: (duration) => set({ duration }),
	time: null,
	setTime: (time) => set({ time }),
	playState: EnVideoPlayState.PAUSED,
	setPlayState: (state) => set({ playState: state }),
	thumbX: 0,
	setThumbX: (x) => set({ thumbX: x }),
}));
