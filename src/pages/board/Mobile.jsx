import { Link } from 'react-router-dom';
import { Scroll } from '../../components/style';
import { MLine } from './board.style';

export default function Mobile({ table, pageSize = 10 }) {
  return (
    <Scroll className="w-full flex flex-col sm:hidden border-t-2 border-(--c)">
      {table.getRowModel().rows.map((row) => (
        <MLine key={row.id}>
          <Link to="post" className="w-full flex flex-col hover:bg-white/20">
            <span className="text-left font-bold">{row.original.title}</span>
            <div className="flex gap-2 text-xs self-end">
              {row.original.writer} | {row.original.createdAt}
            </div>
          </Link>
        </MLine>
      ))}

      {Array.from({ length: pageSize - table.getRowModel().rows.length }).map(
        (_, i) => (
          <MLine key={`empty-${i}`}>
            <span className="font-medium">아직 작성된 글이 없습니다.</span>
          </MLine>
        )
      )}
    </Scroll>
  );
}
