import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Btn, Wrap } from '../../components/style';
import { useFetchStore } from '../../store/useFetchStore';
import { Undo } from './board.style';
import { useBoardDetail } from './useBoardDetail';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Post() {
  const navigate = useNavigate();
  const { boardNo } = useParams();
  const member = useFetchStore((state) => state.member);

  const parsedBoardNo = useMemo(() => Number(boardNo), [boardNo]);
  const isValidBoardNo = Number.isInteger(parsedBoardNo) && parsedBoardNo > 0;

  const { data, loading, error } = useBoardDetail(parsedBoardNo, isValidBoardNo);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState('');

  const writer = data?.memberName ?? data?.boardWriter ?? '-';
  const createdAt = data?.createDate ?? '-';
  const title = data?.boardTitle ?? '';
  const content = data?.boardContent ?? '';
  const isOwner = member && data && member.memberNo === data.memberNo;

  const remove = async () => {
    if (!isOwner || deleting) {
      return;
    }

    const confirmed = window.confirm('이 게시물을 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setActionError('');

      const response = await fetch(`${API_URL}/api/boards/${parsedBoardNo}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.status === 401) {
        throw new Error('로그인 세션이 만료되었습니다.');
      }

      if (!response.ok) {
        throw new Error('게시물을 삭제하는 데 실패했습니다.');
      }

      navigate('/board');
    } catch (err) {
      setActionError(err.message || '게시물을 삭제하는 데 실패했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Wrap className="font-(family-name:--f)">
      <div className="flex font-medium justify-between items-center gap-3">
        <Undo>뒤로가기</Undo>

        {isOwner && (
          <div className="flex gap-2">
            <Btn type="button" onClick={() => navigate(`/board/edit/${parsedBoardNo}`)}>
              수정하기
            </Btn>
            <Btn type="button" onClick={remove} disabled={deleting}>
              {deleting ? '삭제 중...' : '삭제하기'}
            </Btn>
          </div>
        )}
      </div>

      {!isValidBoardNo && <div className="text-sm text-red-200">Invalid post URL.</div>}
      {isValidBoardNo && loading && <div>Loading...</div>}
      {isValidBoardNo && error && <div className="text-sm text-red-200">{error.message}</div>}
      {actionError && <div className="text-sm text-red-200">{actionError}</div>}

      {isValidBoardNo && !loading && !error && data && (
        <>
          <h3 className="bg-white/10 rounded-md py-2 px-4 text-left font-semibold">{title}</h3>
          <div className="flex justify-between border-b pb-2 px-4 font-medium">
            <span>{writer}</span>
            <span>{createdAt}</span>
          </div>

          <div className="bg-white/10 rounded-2xl min-h-0 flex-1 p-4 text-left whitespace-pre-wrap">{content}</div>
        </>
      )}

      {isValidBoardNo && !loading && !error && !data && (
        <div className="text-sm text-red-200">게시물을 찾을 수 없습니다.</div>
      )}
    </Wrap>
  );
}
