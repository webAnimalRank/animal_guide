import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { PageBtn } from '../../components/style';
import Mobile from './Mobile';
import DeskTop from './Desktop';

/**
 * 🔹 컬럼 정의
 * - React Table은 columns가 반드시 필요함
 * - 서버 페이징이므로 컬럼 정의만 담당
 */
const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor('id', {
		header: '번호',
		headerStyle: { width: '3rem' },
		cellStyle: { width: '3rem' },
		cell: (info) => info.getValue()
	}),
	columnHelper.accessor('title', {
		header: '제목',
		headerStyle: { textAlign: 'left', flex: 1 },
		cellStyle: { textAlign: 'left', flex: 1 },
		cell: (info) => info.getValue()
	}),
	columnHelper.accessor('writer', {
		header: '작성자',
		headerStyle: { width: '3rem' },
		cellStyle: { width: '3rem' },
		cell: (info) => info.getValue()
	}),
	columnHelper.accessor('createdAt', {
		header: '작성일',
		headerStyle: { width: '6rem' },
		cellStyle: { width: '6rem' },
		cell: (info) => info.getValue()
	})
];

/**
 * ⚠️ 서버 페이징 전용 DataTable
 * - 페이지 계산은 서버에서
 * - 이 컴포넌트는 화면만 렌더링
 */
export default function DataTable({ data, meta, page, setPage, size }) {
	const totalPages = meta?.totalPages ?? 0;

	const table = useReactTable({
		data,
		columns, // ✅ 이제 정상 참조
		getCoreRowModel: getCoreRowModel(),

		// 서버 페이징 모드
		manualPagination: true,
		pageCount: totalPages,

		state: {
			pagination: {
				pageIndex: page - 1,
				pageSize: size
			}
		}
	});

	// 페이지 묶음(1~10)
	const blockSize = 10;
	const startPage = Math.floor((page - 1) / blockSize) * blockSize + 1;
	const endPage = Math.min(startPage + blockSize - 1, totalPages);

	const pages = [];
	for (let p = startPage; p <= endPage; p++) pages.push(p);

	const start = [
		{ id: 'first', setPage: 1 },
		{ id: 'prev', setPage: page - 1 }
	];

	const end = [
		{ id: 'next', setPage: page + 1 },
		{ id: 'last', setPage: totalPages }
	];

	return (
		<div className='flex flex-col flex-1 min-h-0 font-(family-name:--f)'>
			<Mobile table={table} pageSize={size} />
			<DeskTop table={table} pageSize={size} />

			<div className='mt-6 flex justify-center gap-2 flex-wrap'>
				{start.map((p) => (
					<PageBtn key={p.id} className={p.id} onClick={() => setPage(p.setPage)} disabled={page === 1} />
				))}
				{pages.map((p) => (
					<PageBtn key={p} onClick={() => setPage(p)} disabled={p === page} className={p === page ? 'active' : ''}>
						{p}
					</PageBtn>
				))}
				{end.map((p) => (
					<PageBtn key={p.id} className={p.id} onClick={() => setPage(p.setPage)} disabled={page >= totalPages} />
				))}
			</div>
		</div>
	);
}
