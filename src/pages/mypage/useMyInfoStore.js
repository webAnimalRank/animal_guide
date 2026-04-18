import { create } from 'zustand';
import axios from 'axios';
import { useFetchStore } from '../../store/useFetchStore';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useMyInfoStore = create((set) => ({
  loading: false,

  updateInfo: async (memberNo, payload) => {
    set({ loading: true });
    try {
      const res = await axios.put(
        `${API_URL}/api/members/${memberNo}`,
        payload
      );

      useFetchStore.getState().setMember(res.data);
      set({ loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return {
        success: false,
        message: err.response?.data?.message || '오류 발생'
      };
    }
  }
}));
