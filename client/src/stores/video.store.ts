import { create } from "zustand";

interface IVideoStore {
	video: File | null;
	setVideo: (video: File | null) => void;
}

export const useVideoStore = create<IVideoStore>((set) => ({
	video: null,
	setVideo: (video) => set({ video }),
}));
