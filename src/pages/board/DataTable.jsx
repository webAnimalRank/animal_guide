import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { PageBtn } from '../../components/style';
import Mobile from './Mobile';
import DeskTop from './Desktop';
import { useBoardStore } from './useStore';
import { useEffect } from 'react';

// 컬럼 정의
// React Table은 columns가 반드시 필요함
// 서버 페이징이므로 컬럼 정의만 담당

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
    headerStyle: { width: '5rem' },
    cellStyle: { width: '5rem' },
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('createdAt', {
    header: '작성일',
    headerStyle: { width: '6rem' },
    cellStyle: { width: '6rem' },
    cell: (info) => info.getValue()
  })
];

export default function DataTable({ kind }) {
  const { items, meta, page, size, loading } = useBoardStore(
    (state) => state[kind]
  );
  const setPage = useBoardStore((state) => state.setPage);
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

    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: size
      }
    }
  });

  if (loading && (!items || items.length === 0)) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

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
    <>
      <Mobile table={table} />
      <DeskTop table={table} />

      <div className="flex justify-center gap-2">
        {start.map((p) => (
          <PageBtn
            key={p.id}
            className={p.id}
            onClick={() => setPage(kind, p.setPage)}
            disabled={page === 1}
          />
        ))}
        {pages.map((p) => (
          <PageBtn
            key={p}
            onClick={() => setPage(kind, p)}
            disabled={p === page}
            className={p === page ? 'active' : ''}
          >
            {p}
          </PageBtn>
        ))}
        {end.map((p) => (
          <PageBtn
            key={p.id}
            className={p.id}
            onClick={() => setPage(kind, p.setPage)}
            disabled={page >= totalPages}
          />
        ))}
      </div>
    </>
  );
}
