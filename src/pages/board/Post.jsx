import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Wrap } from '../../components/style';
import { Undo } from './board.style';
import { useBoardDetail } from './useBoardDetail';

export default function Post() {
	const { boardNo } = useParams();
	const parsedBoardNo = useMemo(() => Number(boardNo), [boardNo]);
	const isValidBoardNo = Number.isInteger(parsedBoardNo) && parsedBoardNo > 0;

	const { data, loading, error } = useBoardDetail(parsedBoardNo, isValidBoardNo);

	const writer = data?.memberName ?? data?.boardWriter ?? '-';
	const createdAt = data?.createDate ?? '-';
	const title = data?.boardTitle ?? '';
	const content = data?.boardContent ?? '';

	return (
		<Wrap className='font-(family-name:--f)'>
			<div className='flex font-medium'>
				<Undo>목록</Undo>
			</div>

			{!isValidBoardNo && <div className='text-sm text-red-200'>잘못된 게시글 주소입니다.</div>}
			{isValidBoardNo && loading && <div>Loading...</div>}
			{isValidBoardNo && error && <div className='text-sm text-red-200'>{error.message}</div>}

			{isValidBoardNo && !loading && !error && data && (
				<>
					<h3 className='bg-white/20 rounded-md py-2 px-4 text-left font-semibold'>{title}</h3>
					<div className='flex justify-between border-b pb-2 px-4 font-medium'>
						<span>{writer}</span>
						<span>{createdAt}</span>
					</div>

					<div className='bg-white/20 rounded-2xl min-h-0 flex-1 p-4 text-left whitespace-pre-wrap'>{content}</div>
				</>
			)}

			{isValidBoardNo && !loading && !error && !data && (
				<div className='text-sm text-red-200'>게시글을 찾을 수 없습니다.</div>
			)}
		</Wrap>
	);
}
