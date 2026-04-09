import { useBoardStore } from './useStore';
import { PageBtn } from '../../components/style';

export default function Pagination({ kind }) {
	const { page, meta } = useBoardStore((state) => state[kind]);
	const setPage = useBoardStore((state) => state.setPage);

	const totalPages = meta?.totalPages ?? 0;

	const blockSize = 10;
	const startPage = Math.floor((page - 1) / blockSize) * blockSize + 1;
	const endPage = Math.min(startPage + blockSize - 1, totalPages);

	const pages = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

	const start = [
		{ id: 'first', setPage: 1 },
		{ id: 'prev', setPage: page - 1 }
	];

	const end = [
		{ id: 'next', setPage: page + 1 },
		{ id: 'last', setPage: totalPages }
	];

	return (
		<div className='flex justify-center gap-2'>
			{start.map((p) => (
				<PageBtn key={p.id} className={p.id} onClick={() => setPage(kind, p.setPage)} disabled={page === 1} />
			))}
			{pages.map((p) => (
				<PageBtn key={p} onClick={() => setPage(kind, p)} disabled={p === page} className={p === page ? 'active' : ''}>
					{p}
				</PageBtn>
			))}
			{end.map((p) => (
				<PageBtn key={p.id} className={p.id} onClick={() => setPage(kind, p.setPage)} disabled={page >= totalPages} />
			))}
		</div>
	);
}
