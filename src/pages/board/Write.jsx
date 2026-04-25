import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Btn, Loading, Wrap } from '../../components/style';
import { useFetchStore } from '../../store/useFetchStore';
import { Undo } from './board.style';
import { useBoardDetail } from './useBoardDetail';
import { usePostStore } from './usePostStore';
import toast from 'react-hot-toast';

export default function Write() {
	const navigate = useNavigate();
	const { boardNo } = useParams();
	const location = useLocation();
	const kindItem = location.state?.boardKind ?? 'free';
	const kindTitle = kindItem === 'notice' ? '공지사항' : '자유게시판';

	const member = useFetchStore((state) => state.member);
	const isAdmin = Boolean(member?.isAdmin);

	useEffect(() => {
		if (!member) {
			navigate('/', { replace: true });
		}
	}, [member, navigate]);

	const {
		boardTitle,
		boardContent,
		isProcessing,
		error: actionError,
		setBoardTitle,
		setBoardContent,
		setInitialData,
		submitBoard,
		reset
	} = usePostStore();

	const parsedBoardNo = useMemo(() => Number(boardNo), [boardNo]);
	const isEditMode = Number.isInteger(parsedBoardNo) && parsedBoardNo > 0;
	const { data, loading, error: fetchError } = useBoardDetail(parsedBoardNo, isEditMode);

	useEffect(() => {
		if (!member) {
			return;
		}

		if (!isEditMode && kindItem === 'notice' && !isAdmin) {
			navigate('/board', { replace: true });
		}
	}, [member, isEditMode, kindItem, isAdmin, navigate]);

	useEffect(() => {
		if (isEditMode && data) {
			setInitialData(data);
		}

		return () => reset();
	}, [isEditMode, data, setInitialData, reset]);

	useEffect(() => {
		if (!isEditMode || loading || !data) {
			return;
		}

		if (data.boardKind === 'notice' && !isAdmin) {
			navigate('/board', { replace: true });
		}
	}, [isEditMode, loading, data, isAdmin, navigate]);

	if (!member) return null;

	const isOwner = !isEditMode || member.memberNo === data?.memberNo;

	const submit = async () => {
		try {
			const targetBoardNo = await submitBoard({
				isEditMode,
				boardNo: parsedBoardNo,
				boardKind: isEditMode ? data?.boardKind : kindItem
			});

			if (isEditMode) {
				toast.success('수정 완료되었습니다.');
			} else {
				toast.success('작성되었습니다.');
			}

			navigate(targetBoardNo ? `/board/post/${targetBoardNo}` : '/board');
		} catch (err) {
			console.error('제출 중 오류:', err);
		}
	};

	if (isEditMode && loading) {
		return (
			<Wrap className='font-(family-name:--f) relative bg-(--cw)/60'>
				<Loading className='size-30 absolute top-1/2 left-1/2 -translate-1/2' />
			</Wrap>
		);
	}

	return (
		<Wrap className='font-(family-name:--f) relative bg-(--cw)/60'>
			<h2 className='self-start text-xl font-(family-name:--f2) flex gap-3 items-center'>
				<span className='font-bold'>
					{isEditMode ? (data?.boardKind === 'notice' ? '공지사항' : '자유게시판') : kindTitle}
				</span>
				글 작성
			</h2>
			<div className='flex justify-between items-center font-medium'>
				<Undo>목록</Undo>
				<span>{member.memberName}</span>
			</div>

			{isEditMode && data && !isOwner && <div className='text-sm text-red-200'>자신의 글만 수정할 수 있습니다.</div>}

			<input
				type='text'
				value={boardTitle}
				onChange={(e) => setBoardTitle(e.target.value)}
				disabled={isProcessing || (isEditMode && !isOwner)}
				maxLength={300}
				className='bg-white/15 rounded-md py-2 px-4 text-left font-semibold disabled:opacity-60 backdrop-blur-xs'
				placeholder='제목을 입력하세요'
			/>
			<textarea
				value={boardContent}
				onChange={(e) => setBoardContent(e.target.value)}
				disabled={isProcessing || (isEditMode && !isOwner)}
				maxLength={3000}
				placeholder='내용을 입력하세요'
				className='bg-white/15 rounded-md min-h-0 flex-1 max-h-100 p-4 text-left whitespace-pre-wrap resize-none disabled:opacity-60 backdrop-blur-xs'
			/>

			<div className='flex justify-between items-center'>
				{(fetchError || actionError) && <div className='text-(--p)'>{fetchError?.message || actionError}</div>}
				<Btn
					type='button'
					className='ml-auto disabled:opacity-60'
					onClick={submit}
					disabled={isProcessing || (isEditMode && !isOwner)}
				>
					{isProcessing ? '저장 중...' : isEditMode ? '수정' : '작성'}
				</Btn>
			</div>
		</Wrap>
	);
}
