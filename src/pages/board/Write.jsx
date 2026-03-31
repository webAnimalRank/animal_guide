import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Btn, Wrap } from '../../components/style';
import { useFetchStore } from '../../store/useFetchStore';
import { Undo } from './board.style';
import { useBoardDetail } from './useBoardDetail';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Write() {
  const navigate = useNavigate();
  const { boardNo } = useParams();
  const member = useFetchStore((state) => state.member);

  const parsedBoardNo = useMemo(() => Number(boardNo), [boardNo]);
  const isEditMode = Number.isInteger(parsedBoardNo) && parsedBoardNo > 0;

  const { data, loading } = useBoardDetail(parsedBoardNo, isEditMode);

  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEditMode || !data) {
      return;
    }

    setBoardTitle(data.boardTitle ?? '');
    setBoardContent(data.boardContent ?? '');
  }, [isEditMode, data]);

  const isOwner =
    !isEditMode || (member && data && member.memberNo === data.memberNo);

  const submit = async () => {
    const title = boardTitle.trim();
    const content = boardContent.trim();

    if (!member) {
      setError('로그인이 필요합니다');
      return;
    }

    if (isEditMode && !isOwner) {
      setError('자신의 글만 수정할 수 있습니다');
      return;
    }

    if (!title) {
      setError('제목을 입력해주세요.');
      return;
    }

    if (!content) {
      setError('내용을 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const response = await fetch(
        isEditMode
          ? `${API_URL}/api/boards/${parsedBoardNo}`
          : `${API_URL}/api/boards`,
        {
          method: isEditMode ? 'PUT' : 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            boardTitle: title,
            boardContent: content,
            boardKind: data?.boardKind ?? 'free'
          })
        }
      );

      if (response.status === 401) {
        throw new Error('로그인 세션이 만료되었습니다.');
      }

      if (!response.ok) {
        throw new Error(
          isEditMode
            ? '게시물을 수정하는 데 실패했습니다.'
            : '게시물을 작성하는 데 실패했습니다.'
        );
      }

      const result = await response.json();
      const targetBoardNo = result?.boardNo ?? parsedBoardNo;

      if (targetBoardNo) {
        navigate(`/board/post/${targetBoardNo}`);
        return;
      }

      navigate('/board');
    } catch (err) {
      setError(err.message || '게시물을 저장하는 데 실패했습니다.');
    } finally {
      setSubmitting(false);
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
        disabled={submitting || (isEditMode && !isOwner)}
        maxLength={300}
        className="bg-white/10 rounded-md py-2 px-4 text-left font-semibold disabled:opacity-60"
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={boardContent}
        onChange={(e) => setBoardContent(e.target.value)}
        disabled={submitting || (isEditMode && !isOwner)}
        maxLength={3000}
        placeholder="내용을 입력하세요"
        className="bg-white/10 rounded-md min-h-0 flex-1 max-h-100 p-4 text-left whitespace-pre-wrap resize-none disabled:opacity-60"
      />

      <Btn
        type="button"
        className="self-end disabled:opacity-60"
        onClick={submit}
        disabled={submitting || (isEditMode && !isOwner)}
      >
        {submitting ? 'Submitting...' : isEditMode ? '수정하기' : '작성하기'}
      </Btn>
      {error && <div className="text-sm text-red-200">{error}</div>}
    </Wrap>
  );
}
