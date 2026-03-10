import { create } from 'zustand';
import { filterBirth, filterDebut, filterSex } from './useVillagerFilters';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useVillagerStore = create((set, get) => ({
	// 1. 상태 (State)
	villagers: [],
	loading: false,
	error: null,
	typeOptions: [],

	// 필터 상태
	filters: { type: '', sex: '', birthMonth: '', debut: '', keyword: '' },

	// 2. 액션 (Actions)
	// 필터 업데이트
	setFilter: (key, value) => {
		set((state) => ({
			filters: { ...state.filters, [key]: value }
		}));
		get().fetchVillagers(); // 필터 변경 시 자동으로 재조회
	},

	setKeyword: (word) => {
		set((state) => ({ filters: { ...state.filters, keyword: word } }));
		get().fetchVillagers();
	},

	resetFilters: () => {
		set({
			filters: { type: '', sex: '', birthMonth: '', debut: '', keyword: '' }
		});
		get().fetchVillagers();
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

	fetchVillagers: async () => {
		const { filters } = get();
		const params = new URLSearchParams();

		Object.entries(filters).forEach(([key, val]) => {
			if (val) params.set(key, String(val).padStart(key === 'birthMonth' ? 2 : 0, '0'));
		});

		set({ loading: true, error: null });
		try {
			const res = await fetch(`${API_URL}/api/villagers/search?${params.toString()}`);
			if (!res.ok) throw new Error('조회 실패');
			const data = await res.json();
			set({ villagers: data, loading: false });
		} catch (err) {
			set({ error: err, loading: false, villagers: [] });
		}
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
					...typeOptions.map((opt) => ({ value: String(opt.type), label: opt.typeName }))
				]
			},
			{ key: 'sex', value: filters.sex, setState: (val) => setFilter('sex', val), label: '성별', options: filterSex },
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
