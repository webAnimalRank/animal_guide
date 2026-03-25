import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchStore = create((set) => ({
  villagers: [],
  loading: false,
  error: null,
  member: null,

  // 주민 불러오기
  fetchVillagers: async (paramsString = '') => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${API_URL}/api/villagers/search?${paramsString}`
      );
      if (!res.ok) throw new Error('조회 실패');
      const data = await res.json();
      set({ villagers: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false, villagers: [] });
    }
  },

  // 로그인 상태 확인
  fetchMe: async () => {
    try {
      const res = await axios.get(`${API_URL}/api/members/me`);
      set({ member: res.data });
    } catch (err) {
      set({ member: null });
    }
  },

  //로그아웃
  logout: async () => {
    try {
      await axios.post(`${API_URL}/api/members/logout`);
      set({ member: null });
      return { success: true };
    } catch (err) {
      console.error('로그아웃 실패', err);
      return { success: false, error: err };
    }
  },

  setMember: (data) => set({ member: data })
}));
