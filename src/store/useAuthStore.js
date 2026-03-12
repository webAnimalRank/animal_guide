import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create((set) => ({
	member: null,

	// 로그인 상태 확인
	fetchMe: async () => {
		try {
			const res = await axios.get(`${API_URL}/api/members/me`);
			set({ member: res.data });
		} catch (err) {
			set({ member: null });
		}
	},

	// 로그아웃이나 수동 업데이트 시 사용
	setMember: (data) => set({ member: data })
}));
