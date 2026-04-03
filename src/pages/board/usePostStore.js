import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_BASE_URL;

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
  reset: () =>
    set({ boardTitle: '', boardContent: '', error: '', isProcessing: false }),

  submitBoard: async ({ isEditMode, boardNo, member, boardKind }) => {
    const { boardTitle, boardContent } = get();
    if (!member) throw new Error('로그인이 필요합니다');

    if (!boardTitle.trim()) {
      set({ error: '제목을 입력해주세요!' });
      throw new Error('제목을 입력해주세요!');
    }
    if (!boardContent.trim()) {
      set({ error: '내용을 입력해주세요!' });
      throw new Error('내용을 입력해주세요!');
    }

    set({ isProcessing: true, error: '' });
    try {
      const response = await fetch(
        isEditMode
          ? `${API_URL}/api/boards/${boardNo}`
          : `${API_URL}/api/boards`,
        {
          method: isEditMode ? 'PUT' : 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            boardTitle: boardTitle.trim(),
            boardContent: boardContent.trim(),
            boardKind: boardKind ?? 'free'
          })
        }
      );
      if (!response.ok) throw new Error('게시물 저장 실패');
      const result = await response.json();
      return result?.boardNo ?? boardNo;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ isProcessing: false });
    }
  },

  deleteBoard: async (boardNo) => {
    set({ isProcessing: true, error: '' });
    try {
      const response = await fetch(`${API_URL}/api/boards/${boardNo}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.status === 401) throw new Error('로그인 세션 만료');
      if (!response.ok) throw new Error('삭제 실패');
      return true;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ isProcessing: false });
    }
  }
}));
