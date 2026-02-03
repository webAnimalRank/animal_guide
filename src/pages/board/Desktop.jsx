import { flexRender } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export default function DeskTop({ table }) {
  const cols = [
    { key: 'id', className: 'w-12' },
    { key: 'title', className: 'flex-1 text-left' },
    { key: 'writer', className: 'w-12' },
    { key: 'createdAt', className: 'w-24' }
  ];

  return (
    <div className="w-full border-collapse hidden sm:flex flex-col">
      {table.getHeaderGroups().map((headerGroup) => (
        <div
          key={headerGroup.id}
          className="border-y-2 border-(--c) flex py-2 text-xs font-bold"
        >
          {headerGroup.headers.map((header) => (
            <div
              key={header.id}
              style={{ ...header.column.columnDef.headerStyle }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          ))}
        </div>
      ))}
      {table.getRowModel().rows.map((row) => (
        <Link
          to="post"
          key={row.id}
          className="py-2 flex text-xs font-semibold border-b border-(--c) hover:bg-white/20"
        >
          {cols.map((col) => (
            <span key={col.key} className={col.className}>
              {row.original[col.key]}
            </span>
          ))}
        </Link>
      ))}

      {Array.from({ length: 20 - table.getRowModel().rows.length }).map(
        (_, index) => (
          <div key={index} className="py-2 text-xs border-b border-(--c)">
            아직 작성된 글이 없습니다.
          </div>
        )
      )}
    </div>
  );
}
