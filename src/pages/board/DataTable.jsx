import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Mobile from './Mobile';
import DeskTop from './Desktop';
import { useBoardStore } from './useStore';
import { useEffect } from 'react';
import { columns } from './columns';
import Pagination from './Pagination';
import { Loading } from '../../components/style';

// 컬럼 정의
// React Table은 columns가 반드시 필요함
export default function DataTable({ kind }) {
  const { items, meta, page, size, loading, keyword } = useBoardStore(
    (state) => state[kind]
  );
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

  if (!items || items.length === 0) {
    return (
      <div className='py-10 bg-white/10 rounded-xl'>
        {keyword
          ? `"${keyword}" 에 대한 검색 결과가 없습니다.`
          : '등록된 게시물이 없습니다.'}
      </div>
    );
  }

  return (
    <>
      <div className='flex justify-center items-center'>
        {loading && <Loading className='size-10 absolute' />}
        <Mobile table={table} />
        <DeskTop table={table} />
      </div>
      <Pagination kind={kind} />
    </>
  );
}
