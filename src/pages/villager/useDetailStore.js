import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useVillagerDetailStore = create((set) => ({
	detail: null,
	detailLoading: false,
	detailError: null,

	fetchVillagerDetail: async (villagerNo) => {
		if (!villagerNo) return;
		set({ detailLoading: true, detailError: null, detail: null });
		try {
			const res = await fetch(`${API_URL}/api/villagers/${villagerNo}`);
			const data = await res.json();
			set({ detail: data, detailLoading: false });
		} catch (err) {
			set({ detailError: err, detailLoading: false });
		}
	},

	clearDetail: () => set({ detail: null, detailError: null })
}));
