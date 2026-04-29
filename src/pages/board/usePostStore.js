import { create } from 'zustand';
import api from '../../api/client';
import { useFetchStore } from '../../store/useFetchStore';

export const usePostStore = create((set, get) => ({
	boardTitle: '',
	boardContent: '',
	isProcessing: false,
	error: '',

	setBoardTitle: (title) => set({ boardTitle: title }),
	setBoardContent: (content) => set({ boardContent: content }),
	setError: (msg) => set({ error: msg }),

	setInitialData: (data) =>
		set({
			boardTitle: data?.boardTitle ?? '',
			boardContent: data?.boardContent ?? '',
			error: ''
		}),
	reset: () => set({ boardTitle: '', boardContent: '', error: '', isProcessing: false }),

	submitBoard: async ({ isEditMode, boardNo, boardKind }) => {
		const { boardTitle, boardContent } = get();
		const member = useFetchStore.getState().member;
		const safeBoardKind = boardKind ?? 'free';

		if (!member) throw new Error('로그인이 필요합니다.');

		if (!boardTitle.trim()) {
			set({ error: '제목을 입력해주세요.' });
			throw new Error('제목을 입력해주세요.');
		}
		if (!boardContent.trim()) {
			set({ error: '내용을 입력해주세요.' });
			throw new Error('내용을 입력해주세요.');
		}
		if (safeBoardKind === 'notice' && !member?.isAdmin) {
			set({ error: '공지사항은 관리자만 작성할 수 있습니다.' });
			throw new Error('공지사항은 관리자만 작성할 수 있습니다.');
		}

		set({ isProcessing: true, error: '' });
		try {
			const response = await api.request({
				url: isEditMode ? `/api/boards/${boardNo}` : '/api/boards',
				method: isEditMode ? 'PUT' : 'POST',
				headers: { 'Content-Type': 'application/json' },
				data: {
					boardTitle: boardTitle.trim(),
					boardContent: boardContent.trim(),
					boardKind: safeBoardKind
				}
			});

			const result = response.data;
			return result?.boardNo ?? boardNo;
		} catch (err) {
			set({ error: err.response?.data?.message ?? '게시물을 저장하지 못했습니다.' });
			throw err;
		} finally {
			set({ isProcessing: false });
		}
	},

	deleteBoard: async (boardNo) => {
		set({ isProcessing: true, error: '' });
		try {
			await api.delete(`/api/boards/${boardNo}`);
			return true;
		} catch (err) {
			const message =
				err.response?.status === 401
					? '로그인이 만료되었습니다.'
					: err.response?.status === 403
						? '공지사항은 관리자만 삭제할 수 있습니다.'
						: err.response?.data?.message ?? '삭제에 실패했습니다.';
			set({ error: message });
			throw err;
		} finally {
			set({ isProcessing: false });
		}
	}
}));
