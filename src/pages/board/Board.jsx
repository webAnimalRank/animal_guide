import { Btn, Search, Wrap } from '../../components/style';
import DataTable from './DataTable';
import { Link } from 'react-router-dom';
import { useFetchStore } from '../../store/useFetchStore';

export default function Board() {
  const { member } = useFetchStore();
  const kind = [
    { item: 'notice', title: '공지사항' },
    { item: 'free', title: '자유게시판' }
  ];

  return (
    <Wrap className="h-full! gap-10">
      {kind.map((k) => (
        <div key={k.item} className="sm:flex-1 max-h-100 min-h-0 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{k.title}</h3>
            <Search name="search" placeholder="검색어를 입력하세요" />
          </div>

          <DataTable kind={k.item} />
          {member && (
            <Btn as={Link} to="write">
              글 작성
            </Btn>
          )}
        </div>
      ))}
    </Wrap>
  );
}
