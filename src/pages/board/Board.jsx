import { Search, Wrap } from '../../components/style';
import DataTable from './DataTable';
import { Link } from 'react-router-dom';
import { useFetchStore } from '../../store/useFetchStore';
import { useBoardStore } from './useStore';
import { SearchBtn, WriteBtn } from './board.style';

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
		<Wrap className='h-full! gap-20'>
			{boards.map((board) => (
				<div key={board.item} className='sm:flex-1 max-h-100 min-h-0 flex flex-col gap-5'>
					<div className='flex justify-between items-center gap-3'>
						<h3 className='text-xl font-bold'>{board.title}</h3>
						<form onSubmit={(e) => handleSearchSubmit(e, board.item)} className='flex items-center gap-2'>
							<Search
								className='w-40! text-xs!'
								name={`${board.item}-search`}
								value={boardState[board.item].keyword}
								onChange={(e) => setKeyword(board.item, e.target.value)}
								placeholder='게시글을 검색하세요'
							/>
							<SearchBtn type='submit' onClick={(e) => handleSearchSubmit(e, board.item)} className='self-center!' />
						</form>
					</div>

					<DataTable kind={board.item} />
					{member && (board.item === 'free' || isAdmin) && (
						<WriteBtn as={Link} to='write' state={{ boardKind: board.item }}>
							글 작성
						</WriteBtn>
					)}
				</div>
			))}
		</Wrap>
	);
}
