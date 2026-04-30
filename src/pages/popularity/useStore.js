import { create } from 'zustand';
import api from '../../api/client';

export const MAX_VOTES = 3;

export const usePopularityStore = create((set, get) => ({
	selectedIds: [],
	selectedVillagerCache: new Map(),
	remainingVotes: MAX_VOTES,
	submitting: false,
	ranking: [],
	rankingMonth: '',
	rankingLoading: false,
	rankingError: null,

	resetSelectedIds: () => set({ selectedIds: [], selectedVillagerCache: new Map() }),

	fetchVoteStatus: async () => {
		try {
			const res = await api.get('/api/villagers/votes/me');
			set({ remainingVotes: res.data.remainingVotes ?? MAX_VOTES });
		} catch (e) {
			console.error('?ы몴 ?곹깭 議고쉶 ?ㅽ뙣:', e);
		}
	},

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

	fetchRanking: async () => {
		set({ rankingLoading: true, rankingError: null });
		try {
			const res = await api.get('/api/villagers/votes/ranking');
			set({
				ranking: Array.isArray(res.data?.items) ? res.data.items : [],
				rankingMonth: res.data?.voteMonth ?? '',
				rankingLoading: false
			});
		} catch (e) {
			set({
				ranking: [],
				rankingMonth: '',
				rankingLoading: false,
				rankingError: e.response?.data?.message ?? e.message
			});
		}
	},

	submitVotes: async () => {
		const { selectedIds } = get();
		if (selectedIds.length === 0) return { success: false, message: '?좏깮??二쇰????놁뒿?덈떎.' };

		set({ submitting: true });
		try {
			const res = await api.post('/api/villagers/votes', { villagerNos: selectedIds });
			const data = res.data;
			set({
				remainingVotes: data.remainingVotes ?? 0,
				selectedIds: [],
				selectedVillagerCache: new Map()
			});
			return { success: true, message: '?ы몴媛 ?꾨즺?섏뿀?듬땲??' };
		} catch (e) {
			return { success: false, message: e.response?.data?.message ?? e.message };
		} finally {
			set({ submitting: false });
		}
	}
}));
