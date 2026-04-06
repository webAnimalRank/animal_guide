import { Btn, Search, Wrap } from '../../components/style';
import DataTable from './DataTable';
import { Link } from 'react-router-dom';
import { useFetchStore } from '../../store/useFetchStore';
import { useBoardStore } from './useStore';

export default function Board() {
  const { member } = useFetchStore();
  const { notice, free, setKeyword, submitSearch } = useBoardStore();

  const boards = [
    { item: 'notice', title: '공지사항' },
    { item: 'free', title: '자유게시판' }
  ];

  const boardState = { notice, free };
  const isAdmin = Boolean(member?.isAdmin);

  const handleSearchSubmit = (event, boardKind) => {
    event.preventDefault();
    submitSearch(boardKind);
  };

  return (
    <Wrap className="h-full! gap-10">
      {boards.map((board) => (
        <div
          key={board.item}
          className="sm:flex-1 max-h-100 min-h-0 flex flex-col gap-5"
        >
          <div className="flex justify-between items-center gap-3">
            <h3 className="text-xl font-bold self-start">{board.title}</h3>
            <form
              onSubmit={(event) => handleSearchSubmit(event, board.item)}
              className="flex items-center gap-2"
            >
              <Search
                name={`${board.item}-search`}
                value={boardState[board.item].keyword}
                onChange={(event) => setKeyword(board.item, event.target.value)}
                placeholder="게시글을 검색하세요"
              />
              <Btn type="submit" className="self-auto">
                검색
              </Btn>
            </form>
          </div>

          <DataTable kind={board.item} />
          {member && (board.item === 'free' || isAdmin) && (
            <Btn
              as={Link}
              to="write"
              state={{ boardKind: board.item }}
            >
              글 작성
            </Btn>
          )}
        </div>
      ))}
    </Wrap>
  );
}
