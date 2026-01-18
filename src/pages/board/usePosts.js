import { useEffect, useState } from 'react';

export function usePosts(page = 0, size = 30) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);

		const tempPosts = Array.from({ length: size }, (_, i) => ({
			id: page * size + i + 1,
			title: `게시글 제목 ${page * size + i + 1}`,
			writer: `단테${((page * size + i) % 5) + 1}`,
			createdAt: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
		}));

    setTimeout(() => {
      setData(tempPosts);
      setLoading(false);
    }, 1000);
	}, [page, size]);

	return { data, loading };
}
