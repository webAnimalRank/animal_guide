import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Mobile from './Mobile';
import DeskTop from './Desktop';
import { useBoardStore } from './useStore';
import { useEffect } from 'react';
import { columns } from './columns';
import Pagination from './Pagination';

// 컬럼 정의
// React Table은 columns가 반드시 필요함
export default function DataTable({ kind }) {
	const { items, meta, page, size, loading } = useBoardStore((state) => state[kind]);
	const fetchPosts = useBoardStore((state) => state.fetchPosts);

	useEffect(() => {
		fetchPosts(kind);
	}, [kind]);

	const totalPages = meta?.totalPages ?? 0;

	const table = useReactTable({
		data: items || [],
		columns,
		getCoreRowModel: getCoreRowModel(),

		// 서버 페이징 모드
		manualPagination: true,
		pageCount: totalPages,

		state: { pagination: { pageIndex: page - 1, pageSize: size } },
		meta: { kind: kind }
	});

	if (loading && (!items || items.length === 0)) {
		return <div>데이터를 불러오는 중입니다...</div>;
	}

	return (
		<>
			<Mobile table={table} />
			<DeskTop table={table} />
			<Pagination kind={kind} />
		</>
	);
}
