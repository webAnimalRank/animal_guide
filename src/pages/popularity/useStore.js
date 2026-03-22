import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_BASE_URL;
export const MAX_VOTES = 3;

export const usePopularityStore = create((set, get) => ({
	selectedIds: [],
	selectedVillagerCache: new Map(),
	remainingVotes: MAX_VOTES,
	submitting: false,

	// 선택된 주민 초기화
	resetSelectedIds: () => set({ selectedIds: [], selectedVillagerCache: new Map() }),

	// 초기 투표 상태 조회
	fetchVoteStatus: async () => {
		try {
			const res = await fetch(`${API_URL}/api/villagers/votes/me`, { credentials: 'include' });
			if (res.ok) {
				const data = await res.json();
				set({ remainingVotes: data.remainingVotes ?? MAX_VOTES });
			}
		} catch (e) {
			console.error('투표 상태 조회 실패:', e);
		}
	},

	// 주민 선택/해제 로직
	toggleVillager: (villager, checked) => {
		const { selectedIds, remainingVotes, selectedVillagerCache } = get();

		if (!checked) {
			set({ selectedIds: selectedIds.filter((id) => id !== villager.villagerNo) });
			return;
		}

		if (selectedIds.length >= remainingVotes) return;

		const newCache = new Map(selectedVillagerCache);
		newCache.set(villager.villagerNo, villager);

		set({
			selectedIds: [...selectedIds, villager.villagerNo],
			selectedVillagerCache: newCache
		});
	},

	// 투표 제출 로직
	submitVotes: async () => {
		const { selectedIds } = get();
		if (selectedIds.length === 0) return { success: false, message: '선택한 주민이 없습니다.' };

		set({ submitting: true });
		try {
			const res = await fetch(`${API_URL}/api/villagers/votes`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ villagerNos: selectedIds })
			});

			if (!res.ok) throw new Error('투표 처리에 실패했습니다.');

			const data = await res.json();
			set({
				remainingVotes: data.remainingVotes ?? 0,
				selectedIds: [],
				selectedVillagerCache: new Map()
			});
			return { success: true, message: '투표가 완료되었습니다.' };
		} catch (e) {
			return { success: false, message: e.message };
		} finally {
			set({ submitting: false });
		}
	}
}));
