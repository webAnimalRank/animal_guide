import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Btn, Wrap } from '../../components/style';
import { useFetchStore } from '../../store/useFetchStore';
import { Undo } from './board.style';
import { useBoardDetail } from './useBoardDetail';
import { usePostStore } from './usePostStore';

export default function Post() {
  const navigate = useNavigate();
  const { boardNo } = useParams();

  const location = useLocation();
  const kindItem = location.state?.boardKind ?? 'free';
  const kindTitle = kindItem === 'notice' ? '공지사항' : '자유게시판';

  const member = useFetchStore((state) => state.member);
  const {
    isProcessing,
    error: actionError,
    deleteBoard,
    reset
  } = usePostStore();

  const parsedBoardNo = useMemo(() => Number(boardNo), [boardNo]);
  const isValidBoardNo = Number.isInteger(parsedBoardNo) && parsedBoardNo > 0;

  const {
    data,
    loading,
    error: fetchError
  } = useBoardDetail(parsedBoardNo, isValidBoardNo);

  const isOwner = member && data && member.memberNo === data.memberNo;

  const handleRemove = async () => {
    if (!isOwner || isProcessing) return;
    if (!window.confirm('이 게시물을 삭제하시겠습니까?')) return;

    try {
      await deleteBoard(parsedBoardNo);
      navigate('/board');
    } catch (err) {
      console.error('삭제 중 오류 발생:', err);
    }
  };

  return (
    <Wrap className="font-(family-name:--f)">
      <h2 className="self-start text-xl font-bold font-(family-name:--f2) flex gap-3 items-center">
        {kindTitle}
      </h2>
      <div className="flex font-medium justify-between items-center gap-3">
        <Undo>목록</Undo>

        {isOwner && (
          <div className="flex gap-2">
            <Btn onClick={() => navigate(`/board/edit/${parsedBoardNo}`)}>
              수정
            </Btn>
            <Btn onClick={handleRemove} disabled={isProcessing}>
              {isProcessing ? '삭제 중...' : '삭제'}
            </Btn>
          </div>
        )}
      </div>

      {!isValidBoardNo && (
        <div className="text-sm text-red-200">Invalid post URL.</div>
      )}
      {loading && <div>Loading...</div>}
      {(fetchError || actionError) && (
        <div className="text-sm text-red-200">
          {fetchError?.message || actionError}
        </div>
      )}

      {data && !loading && (
        <>
          <h3 className="bg-white/15 rounded-md py-2 px-4 text-left font-semibold">
            {data.boardTitle}
          </h3>
          <div className="flex justify-between border-b pb-2 px-4 font-medium">
            <span>{data.memberName ?? data.boardWriter ?? '-'}</span>
            <span>{data.createDate ?? '-'}</span>
          </div>

          <div className="bg-white/15 rounded-2xl min-h-0 flex-1 max-h-100 p-4 text-left whitespace-pre-wrap">
            {data.boardContent}
          </div>
        </>
      )}
    </Wrap>
  );
}
