import { create } from "zustand";
import { EnToolItem } from "../ts/tools.enums";

interface IToolsStore {
	selectedItem: EnToolItem;
	setSelectedItem: (item: EnToolItem) => void;
}

export const useToolsStore = create<IToolsStore>((set) => ({
	selectedItem: EnToolItem.NONE,
	setSelectedItem: (item) => set({ selectedItem: item }),
}));
