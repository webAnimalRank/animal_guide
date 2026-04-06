import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useBoardStore = create((set, get) => ({
  notice: { items: [], meta: {}, page: 1, size: 5, loading: false, search: 'titleContent', keyword: '' },
  free: { items: [], meta: {}, page: 1, size: 5, loading: false, search: 'titleContent', keyword: '' },

  setPage: (kind, page) => {
    set((state) => ({
      [kind]: { ...state[kind], page }
    }));
    get().fetchPosts(kind);
  },

  setKeyword: (kind, keyword) => {
    set((state) => ({
      [kind]: { ...state[kind], keyword }
    }));

    if (keyword.trim() === '') {
      set((state) => ({
        [kind]: { ...state[kind], page: 1 }
      }));
      get().fetchPosts(kind);
    }
  },

  submitSearch: (kind) => {
    set((state) => ({
      [kind]: { ...state[kind], page: 1 }
    }));
    get().fetchPosts(kind);
  },

  fetchPosts: async (kind) => {
    const { page, size, search, keyword } = get()[kind];
    set((state) => ({ [kind]: { ...state[kind], loading: true } }));

    try {
      const qs = new URLSearchParams({
        kind,
        page: String(page),
        size: String(size),
        search,
        keyword
      });
      const response = await fetch(`${API_URL}/api/boards?${qs.toString()}`);
      const result = await response.json();

      const mapped = (result.items ?? []).map((b) => ({
        id: b.boardNo,
        title: b.boardTitle,
        writer: b.memberName ?? b.boardWriter ?? '',
        createdAt: (b.createDate ?? '').replace('T', ' ')
      }));

      set((state) => ({
        [kind]: {
          ...state[kind],
          items: mapped,
          meta: {
            totalPages: result.totalPages,
            totalItems: result.totalItems
          },
          loading: false
        }
      }));
    } catch (err) {
      set((state) => ({ [kind]: { ...state[kind], loading: false } }));
      console.error(err);
    }
  }
}));
