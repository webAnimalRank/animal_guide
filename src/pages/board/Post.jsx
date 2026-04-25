import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usePostAction from './usePostAction';
import { Btn, Loading, Wrap } from '../../components/style';
import { Undo } from './board.style';

export default function Post() {
	const navigate = useNavigate();
	const { boardNo } = useParams();

	const { state } = useLocation();
	const kindTitle = state?.boardKind === 'notice' ? '공지사항' : '자유게시판';

	const { parsedBoardNo, data, status, error, isOwner, handleRemove, writerInfo } = usePostAction(boardNo);

	if (!status.isValid) return <Wrap>Invalid post URL.</Wrap>;

	if (status.loading) {
		return (
			<Wrap className='justify-center items-center'>
				<Loading className='size-20 max-sm:size-10' />
			</Wrap>
		);
	}

	if (error.fetch || error.action) {
		return (
			<Wrap>
				<div>{error.fetch?.message || error.action}</div>
			</Wrap>
		);
	}

	if (!data) return null;

	return (
		<Wrap className='font-(family-name:--f) bg-(--cw)/60'>
			<h2 className='self-start text-xl font-bold font-(family-name:--f2)'>{kindTitle}</h2>
			<div className='flex font-medium justify-between items-center gap-3'>
				<Undo>목록</Undo>

				{isOwner && (
					<div className='flex'>
						<Btn onClick={() => navigate(`/board/edit/${parsedBoardNo}`)}>수정</Btn>
						<Btn onClick={handleRemove} disabled={status.isProcessing}>
							삭제
						</Btn>
					</div>
				)}
			</div>

			<h3 className='bg-white/15 rounded-md py-2 px-4 text-left font-semibold backdrop-blur-xs'>{data.boardTitle}</h3>
			<div className='flex gap-4 items-center max-sm:text-xs'>
				<img src={writerInfo.image} className='h-14 max-sm:h-10 bg-white/15 rounded-full p-1' alt={writerInfo.name} />
				<div className='flex flex-col items-start gap-1'>
					{writerInfo.name}
					<span>{writerInfo.date}</span>
				</div>
			</div>

			<div className='bg-white/15 rounded-2xl min-h-0 flex-1 max-h-100 p-4 text-left whitespace-pre-wrap backdrop-blur-xs'>
				{data.boardContent}
			</div>
		</Wrap>
	);
}
