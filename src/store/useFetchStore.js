import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchStore = create((set) => ({
  villagers: [],
  loading: false,
  isAuthLoading: true,
  error: null,
  member: null,
  members : [],

  setAuthLoading: (bool) => set({ isAuthLoading: bool }),

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
    set({ isAuthLoading: true });
    try {
      const res = await axios.get(`${API_URL}/api/members/me`);
      set({ member: res.data, isAuthLoading: false });
      localStorage.setItem('isLogin', 'true');
    } catch (err) {
      set({ member: null, isAuthLoading: false });
      if (err.response?.status === 401) {
        localStorage.removeItem('isLogin');
      }
    }
  },

  //로그아웃
  logout: async () => {
    try {
      await axios.post(`${API_URL}/api/members/logout`);
      set({ member: null });
      localStorage.removeItem('isLogin');
      return { success: true };
    } catch (err) {
      console.error('로그아웃 실패', err);
      return { success: false, error: err };
    }
  },

  // members (전체 회원)
  fetchMembers: async () => {
      try {
        const res = await axios.get(`${API_URL}/api/members`);
        set({ members: res.data });
      } catch (err) {
        console.error('회원 목록 로드 실패', err);
        set({ members: [] });
      }
    },

  setMember: (data) => set({ member: data })
}));
