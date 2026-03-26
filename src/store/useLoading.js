import { create } from 'zustand';

export const useLoading = create((set) => ({
	loadingCount: 0,
	isLoading: false,
	setIsLoading: (status) => set({ isLoading: status }),

	actions: {
		startLoading: () =>
			set((state) => ({
				loadingCount: state.loadingCount + 1,
				isLoading: true
			})),
		stopLoading: () =>
			set((state) => {
				const nextCount = Math.max(state.loadingCount - 1, 0);
				return {
					loadingCount: nextCount,
					isLoading: nextCount > 0
				};
			})
	}
}));
