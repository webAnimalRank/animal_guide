import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useBirthdayStore = create((set) => ({
	// 생일 주민 상태
	birthdayVillagers: [],
	birthdayLoading: false,
	birthdayError: null,

	fetchBirthdayVillagers: async (month) => {
		set({ birthdayLoading: true, birthdayError: null });
		try {
			const res = await fetch(`${API_URL}/api/villagers/search?birthMonth=${String(month).padStart(2, '0')}`);
			const data = await res.json();
			set({ birthdayVillagers: data, birthdayLoading: false });
		} catch (err) {
			set({ birthdayError: err, birthdayLoading: false });
		}
	}
}));
