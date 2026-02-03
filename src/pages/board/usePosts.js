import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 게시판 목록 조회 훅
 *
 * ⚠️ 중요
 * - 이 훅은 "서버 페이징" 전용이다.
 * - page / size / kind가 바뀌면 서버에 다시 요청한다.
 * - 클라이언트에서 slice() 같은 페이징을 하면 안 된다.
 */
export function usePosts({
  kind = 'notice',            // 공지/자유 탭 구분 (notice | free)
  search = 'titleContent',    // 검색 타입
  keyword = '',
  page = 1,                   // 서버 페이지 번호 (1부터 시작)
  size = 20,                  // 페이지당 개수
} = {}) {

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    size: 20,
    totalItems: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        /**
         * ⚠️ 서버 페이징 파라미터
         * 반드시 kind / page / size가 같이 전송되어야 함
         */
        const qs = new URLSearchParams({
          kind,
          search,
          keyword,
          page: String(page),
          size: String(size),
        });

        const response = await fetch(
          `${API_URL}/api/boards?${qs.toString()}`
        );

        if (!response.ok) {
          throw new Error('게시판 조회 실패');
        }

        const result = await response.json();

        /**
         * 서버에서 내려준 데이터를
         * DataTable에서 쓰는 형태로 매핑
         */
        const mapped = (result.items ?? []).map((b) => ({
          id: b.boardNo,
          title: b.boardTitle,
          writer: b.memberName ?? b.boardWriter ?? '',
          createdAt: (b.createDate ?? '').replace('T', ' '),
        }));

        if (!mounted) return;

        setItems(mapped);
        setMeta({
          page: result.page,
          size: result.size,
          totalItems: result.totalItems,
          totalPages: result.totalPages,
        });
      } catch (err) {
        if (!mounted) return;
        setError(err);
        setItems([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, [kind, search, keyword, page, size]); // ⚠️ 하나라도 바뀌면 서버 재요청

  return { items, meta, loading, error };
}
