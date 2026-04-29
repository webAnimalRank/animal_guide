import { create } from 'zustand';
import api from '../../api/client';
import { useFetchStore } from '../../store/useFetchStore';

export const useMyInfoStore = create((set) => ({
  loading: false,

  updateInfo: async (memberNo, payload) => {
    set({ loading: true });
    try {
      const res = await api.put(`/api/members/${memberNo}`, payload);

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
