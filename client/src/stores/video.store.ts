import { create } from "zustand";
import { EnVideoPlayState } from "../ts/enums/video.enums";
import { getFFMpegStore } from "./ffmpeg.store";
import { fetchFile } from "@ffmpeg/util";

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
	cutVideo: (start: string, end: string) => Promise<void>;
	undo: () => Promise<void>;
}

export const useVideoStore = create<IVideoStore>((set, get) => ({
	stack: [],
	video: null,
	uploadVideo: async (video) => {
		const { ffmpeg } = getFFMpegStore();
		const { stack } = get();
		for (const stateName of stack) {
			await ffmpeg.deleteFile(stateName);
		}
		const INITIAL_STATE = "STATE_1.mp4";
		await ffmpeg.writeFile(INITIAL_STATE, await fetchFile(video));

		const data = await ffmpeg.readFile(INITIAL_STATE);

		const newStack = [INITIAL_STATE];
		set({
			video: URL.createObjectURL(new Blob([data], { type: "video/mp4" })),
			stack: newStack,
		});
	},
	undo: async () => {
		const { ffmpeg } = getFFMpegStore();
		const { stack } = get();
		const newStack = [...stack];
		newStack.pop();
		const newState = newStack[newStack.length - 1];
		const data = await ffmpeg.readFile(newState);
		set({
			video: URL.createObjectURL(new Blob([data], { type: "video/mp4" })),
			stack: newStack,
		});
	},
	cutVideo: async (start, end) => {
		const { ffmpeg } = getFFMpegStore();
		const { video, stack } = get();
		if (video) {
			const PREV_STATE = stack[stack.length - 1];
			const PREV_STATE_INDEX = PREV_STATE.split(".")[0].split("_")[1];
			const NEW_STATE = `STATE_${PREV_STATE_INDEX + 1}.mp4`;
			await ffmpeg.writeFile(NEW_STATE, await fetchFile(video));
			await ffmpeg.exec([
				"-i",
				PREV_STATE,
				"-ss",
				start,
				"-to",
				end,
				"-c:v",
				"copy",
				"-c:a",
				"copy",
				NEW_STATE,
			]);
			const newStack = [...stack, NEW_STATE];

			const data = await ffmpeg.readFile(NEW_STATE);

			set({
				video: URL.createObjectURL(new Blob([data], { type: "video/mp4" })),
				stack: newStack,
			});
		}
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
