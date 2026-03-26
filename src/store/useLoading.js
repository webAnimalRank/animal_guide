import { create } from 'zustand';

export const useLoading = create((set) => ({
	isLoading: true,
	setIsLoading: (status) => set({ isLoading: status })
}));
