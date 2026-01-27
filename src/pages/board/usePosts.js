import { useEffect, useState } from 'react';

export function usePosts(page = 1, size = 10) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8080/api/boards?page=${page}&size=${size}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // 백엔드 데이터 → DataTable용 데이터로 변환
        const mapped = (result.items ?? []).map((b) => ({
          id: b.boardNo,
          title: b.boardTitle,
          writer: b.boardWriter ?? b.memberName,
          createdAt: (b.createDate ?? '').replace('T', ' ')
        }));

        setData(mapped);
      } catch (err) {
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, size]);

  return { data, loading, error };
}
