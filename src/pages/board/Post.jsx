import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usePostAction from './usePostAction';
import { Btn, Loading, Wrap } from '../../components/style';
import { Undo } from './board.style';
import tom from '../../assets/img/tom_icon.png';
import { useFetchStore } from '../../store/useFetchStore';

export default function Post() {
	const navigate = useNavigate();
	const { boardNo } = useParams();

	const { state } = useLocation();
	const kindTitle = state?.boardKind === 'notice' ? '공지사항' : '자유게시판';

	const { parsedBoardNo, data, loading, fetchError, actionError, isOwner, isProcessing, handleRemove, isValidBoardNo } =
		usePostAction(boardNo);

	const { villagers, members } = useFetchStore();

	if (!isValidBoardNo) {
		return <Wrap>Invalid post URL.</Wrap>;
	}

	if (loading) {
		return (
			<Wrap className='justify-center items-center'>
				<Loading className='size-20 max-sm:size-10' />
			</Wrap>
		);
	}

	if (fetchError || actionError) {
		return (
			<Wrap>
				<div>{fetchError?.message || actionError}</div>
			</Wrap>
		);
	}

	if (!data) return null;
	
	const writerMember = members?.find(
		(m) => m.memberNo === data.memberNo 
	);
	// DB에 들어있는 profileVillagerNo 기준으로 아이콘 세팅
	const existingVillager = villagers?.find(
	(v) => v.villagerNo === writerMember?.profileVillagerNo);

		
	console.log(data);

	return (
		<Wrap className='font-(family-name:--f)'>
			<h2 className='self-start text-xl font-bold font-(family-name:--f2)'>{kindTitle}</h2>
			<div className='flex font-medium justify-between items-center gap-3'>
				<Undo>목록</Undo>

				{isOwner && (
					<div className='flex'>
						<Btn onClick={() => navigate(`/board/edit/${parsedBoardNo}`)}>수정</Btn>
						<Btn onClick={handleRemove} disabled={isProcessing}>
							삭제
						</Btn>
					</div>
				)}
			</div>

			<h3 className='bg-white/15 rounded-md py-2 px-4 text-left font-semibold'>{data.boardTitle}</h3>
			<div className='flex gap-4 items-center max-sm:text-xs'>
				<img src={existingVillager?.villagerImageIcon ?? tom} className='h-14 max-sm:h-10 bg-white/15 rounded-full p-1' alt='' />
				<div className='flex flex-col items-start gap-1'>
					{data.memberName ?? data.boardWriter ?? '-'}
					<span>{data.createDate ?? '-'}</span>
				</div>
			</div>

			<div className='bg-white/15 rounded-2xl min-h-0 flex-1 max-h-100 p-4 text-left whitespace-pre-wrap'>
				{data.boardContent}
			</div>
		</Wrap>
	);
}
