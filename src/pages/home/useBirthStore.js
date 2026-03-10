import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// 생일 주민 상태
export const useBirthStore = create((set, get) => ({
	birthVillagers: [],
	birthLoading: false,
	birthError: null,

	getStatusMessage: (currentMonth) => {
		const { birthLoading, birthError, birthVillagers } = get();

		if (birthLoading) return '불러오는 중...';
		if (birthError) return '데이터를 불러오지 못했습니다.';
		if (birthVillagers.length === 0) return `${currentMonth}월 생일 주민이 없습니다.`;
		return null;
	},

	formatBirth: (birth) => {
		if (!birth || typeof birth !== 'string' || !birth.includes('-')) return '-';
		const [, day] = birth.split('-');
		return `${Number(day)}일`;
	},

	fetchBirthVillagers: async (month) => {
		set({ birthLoading: true, birthError: null });
		try {
			const res = await fetch(`${API_URL}/api/villagers/search?birthMonth=${String(month).padStart(2, '0')}`);
			if (!res.ok) throw new Error();
			const data = await res.json();

			const sortedData = [...data].sort((a, b) => {
				const aDay = Number(a?.villagerBirth?.split('-')[1]) || 99;
				const bDay = Number(b?.villagerBirth?.split('-')[1]) || 99;
				return aDay - bDay;
			});

			set({ birthVillagers: sortedData, birthLoading: false });
		} catch (err) {
			set({ birthError: err, birthLoading: false, birthVillagers: [] });
		}
	},

	isItemToday: (birth) => {
		const today = new Date();
		const [m, d] = String(birth ?? '').split('-');
		return Number(m) === today.getMonth() + 1 && Number(d) === today.getDate();
	}
}));
