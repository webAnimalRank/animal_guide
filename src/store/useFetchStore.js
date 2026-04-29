import { create } from 'zustand';
import api from '../api/client';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchStore = create((set) => ({
	villagers: [],
	loading: false,
	isAuthLoading: true,
	error: null,
	member: null,
	members: [],

	setAuthLoading: (bool) => set({ isAuthLoading: bool }),

	fetchVillagers: async (paramsString = '') => {
		set({ loading: true, error: null });
		try {
			const res = await fetch(`${API_URL}/api/villagers/search?${paramsString}`);
			if (!res.ok) throw new Error('조회 실패');
			const data = await res.json();
			set({ villagers: data, loading: false });
		} catch (err) {
			set({ error: err, loading: false, villagers: [] });
		}
	},

	fetchMe: async () => {
		set({ isAuthLoading: true });
		const token = localStorage.getItem('accessToken');

		if (!token) {
			set({ member: null, isAuthLoading: false });
			return;
		}

		try {
			const res = await api.get('/api/members/me');
			set({ member: res.data, isAuthLoading: false });
		} catch (err) {
			set({ member: null, isAuthLoading: false });
			localStorage.removeItem('accessToken');
		}
	},

	logout: async () => {
		localStorage.removeItem('accessToken');
		set({ member: null });
		return { success: true };
	},

	fetchMembers: async () => {
		try {
			const res = await api.get('/api/members');
			set({ members: res.data });
		} catch (err) {
			console.error('회원 목록 로드 실패', err);
			set({ members: [] });
		}
	},

	setMember: (data) => set({ member: data })
}));
