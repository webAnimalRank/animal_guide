import { create } from 'zustand';
import { filterBirth, filterDebut, filterSex } from './useVillagerFilters';
import { useFetchStore } from '../../store/useFetchStore';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useVillagerStore = create((set, get) => ({
  typeOptions: [],
  filters: { type: '', sex: '', birthMonth: '', debut: '', keyword: '' },

  // 필터 업데이트
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    }));
    get().applyFilters(); // 필터 변경 시 자동으로 재조회
  },

  setKeyword: (word) => {
    set((state) => ({ filters: { ...state.filters, keyword: word } }));
    get().applyFilters();
  },

  resetFilters: () => {
    set({
      filters: { type: '', sex: '', birthMonth: '', debut: '', keyword: '' }
    });
    get().applyFilters();
  },

  // API 호출
  fetchVillagerTypes: async () => {
    try {
      const res = await fetch(`${API_URL}/api/villagers/types`);
      const data = await res.json();
      set({ typeOptions: Array.isArray(data) ? data : [] });
    } catch (err) {
      console.error(err);
    }
  },

  applyFilters: () => {
    const { filters } = get();
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, val]) => {
      if (val)
        params.set(
          key,
          String(val).padStart(key === 'birthMonth' ? 2 : 0, '0')
        );
    });

    useFetchStore.getState().fetchVillagers(params.toString());
  },

  getFilterConfigs: () => {
    const { filters, setFilter, typeOptions } = get();

    return [
      {
        key: 'type',
        value: filters.type,
        setState: (val) => setFilter('type', val),
        label: '종족',
        options: [
          { value: '', label: '종족' },
          ...typeOptions.map((opt) => ({
            value: String(opt.type),
            label: opt.typeName
          }))
        ]
      },
      {
        key: 'sex',
        value: filters.sex,
        setState: (val) => setFilter('sex', val),
        label: '성별',
        options: filterSex
      },
      {
        key: 'birthMonth',
        value: filters.birthMonth,
        setState: (val) => setFilter('birthMonth', val),
        label: '생일',
        options: filterBirth
      },
      {
        key: 'debut',
        value: filters.debut,
        setState: (val) => setFilter('debut', val),
        label: '데뷔',
        options: filterDebut
      }
    ];
  }
}));
