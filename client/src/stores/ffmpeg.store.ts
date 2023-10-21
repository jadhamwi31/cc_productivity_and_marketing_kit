import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { create } from "zustand";

interface IFFMpegStore {
	ffmpeg: FFmpeg;
	load: () => Promise<void>;
	loading: boolean;
}

export const useFFMpegStore = create<IFFMpegStore>((set, get) => ({
	ffmpeg: new FFmpeg(),
	loading: true,
	load: async () => {
		const ffmpeg = get().ffmpeg;
		const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm";
		ffmpeg.on("log", ({ message }) => {
			console.log(message);
		});
		await ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
			wasmURL: await toBlobURL(
				`${baseURL}/ffmpeg-core.wasm`,
				"application/wasm"
			),
		});
		set({ loading: false });
	},
}));

export const getFFMpegStore = useFFMpegStore.getState;
