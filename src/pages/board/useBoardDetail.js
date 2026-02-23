import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function useBoardDetail(boardNo, enabled = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !boardNo) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/boards/${boardNo}`);
        if (!response.ok) throw new Error('게시글 상세 조회 실패');

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [boardNo, enabled]);

  return { data, loading, error };
}
