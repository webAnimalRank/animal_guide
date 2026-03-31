import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Btn, Wrap } from '../../components/style';
import { useFetchStore } from '../../store/useFetchStore';
import { Undo } from './board.style';
import { useBoardDetail } from './useBoardDetail';
import { usePostStore } from './usePostStore';

export default function Write() {
  const navigate = useNavigate();
  const { boardNo } = useParams();

  const member = useFetchStore((state) => state.member);
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

  const {
    data,
    loading,
    error: fetchError
  } = useBoardDetail(parsedBoardNo, isEditMode);

  useEffect(() => {
    if (isEditMode && data) {
      setInitialData(data);
    }

    return () => reset();
  }, [isEditMode, data, setInitialData, reset]);

  const isOwner =
    !isEditMode || (member && data && member.memberNo === data.memberNo);

  const submit = async () => {
    try {
      const targetBoardNo = await submitBoard({
        isEditMode,
        boardNo: parsedBoardNo,
        member,
        boardKind: data?.boardKind
      });

      navigate(targetBoardNo ? `/board/post/${targetBoardNo}` : '/board');
    } catch (err) {
      console.error('제출 중 오류:', err);
    }
  };

  if (isEditMode && loading) {
    return (
      <Wrap className="font-(family-name:--f)">
        <div className="flex font-medium">
          <Undo>뒤로가기</Undo>
        </div>
        <div>Loading...</div>
      </Wrap>
    );
  }

  return (
    <Wrap className="font-(family-name:--f)">
      <div className="flex justify-between font-medium">
        <Undo>뒤로가기</Undo>

        <span className="text-(--p)">{member.memberName}</span>
      </div>

      {isEditMode && data && !isOwner && (
        <div className="text-sm text-red-200">
          자신의 글만 수정할 수 있습니다.
        </div>
      )}

      <input
        type="text"
        value={boardTitle}
        onChange={(e) => setBoardTitle(e.target.value)}
        disabled={isProcessing || (isEditMode && !isOwner)}
        maxLength={300}
        className="bg-white/10 rounded-md py-2 px-4 text-left font-semibold disabled:opacity-60"
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={boardContent}
        onChange={(e) => setBoardContent(e.target.value)}
        disabled={isProcessing || (isEditMode && !isOwner)}
        maxLength={3000}
        placeholder="내용을 입력하세요"
        className="bg-white/10 rounded-md min-h-0 flex-1 max-h-100 p-4 text-left whitespace-pre-wrap resize-none disabled:opacity-60"
      />

      <Btn
        type="button"
        className="self-end disabled:opacity-60"
        onClick={submit}
        disabled={isProcessing || (isEditMode && !isOwner)}
      >
        {isProcessing ? 'Submitting...' : isEditMode ? '수정하기' : '작성하기'}
      </Btn>
      {(fetchError || actionError) && (
        <div className="text-sm text-red-200">
          {fetchError?.message || actionError}
        </div>
      )}
    </Wrap>
  );
}
