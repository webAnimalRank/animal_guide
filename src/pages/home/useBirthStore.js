import { create } from 'zustand';
import { useLoading } from '../../store/useLoading';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useBirthStore = create((set, get) => ({
	// --- 상태 (State) ---
	birthVillagers: [],
	birthLoading: false,
	birthError: null,
	currentPage: 1,
	itemsPerPage: 5,

	// --- 기능 (Actions) ---
	actions: {
		formatBirth: (birth) => {
			if (!birth || typeof birth !== 'string' || !birth.includes('-')) return '-';
			const [, day] = birth.split('-');
			return `${Number(day)}일`;
		},

		fetchBirthVillagers: async (month) => {
			const { startLoading, stopLoading } = useLoading.getState().actions;
			startLoading();
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
				get().actions.goToTodayPage();
			} catch (err) {
				set({ birthError: err, birthLoading: false, birthVillagers: [] });
			} finally {
				set({ birthLoading: false });
				stopLoading();
			}
		},

		setCurrentPage: (page) => set({ currentPage: page }),

		goToTodayPage: () => {
			const { birthVillagers, itemsPerPage } = get();
			const today = new Date();
			const tMonth = today.getMonth() + 1;
			const tDay = today.getDate();

			const todayIndex = birthVillagers.findIndex((item) => {
				const [m, d] = String(item.villagerBirth ?? '').split('-');
				return Number(m) === tMonth && Number(d) === tDay;
			});

			if (todayIndex !== -1) {
				set({ currentPage: Math.floor(todayIndex / itemsPerPage) + 1 });
			}
		},

		isItemToday: (birth) => {
			const today = new Date();
			const [m, d] = String(birth ?? '').split('-');
			return Number(m) === today.getMonth() + 1 && Number(d) === today.getDate();
		}
	}
}));
