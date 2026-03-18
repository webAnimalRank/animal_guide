import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Btn, Wrap } from '../../components/style';
import { useFetchStore } from '../../store/useFetchStore';
import { Undo } from './board.style';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Write() {
  const navigate = useNavigate();
  const member = useFetchStore((state) => state.member);

  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    const title = boardTitle.trim();
    const content = boardContent.trim();

    if (!member) {
      setError('로그인이 필요한 서비스 입니다.');
      return;
    }

    if (!title) {
      setError('제목을 입력하세요!');
      return;
    }

    if (!content) {
      setError('내용을 입력하세요!');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const response = await fetch(`${API_URL}/api/boards`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          boardTitle: title,
          boardContent: content,
          boardKind: 'free'
        })
      });

      if (response.status === 401) {
        throw new Error('로그인 세션이 만료되었습니다.');
      }

      if (!response.ok) {
        throw new Error('게시물을 생성하지 못했습니다.');
      }

      const result = await response.json();
      const createdBoardNo = result?.boardNo;

      if (createdBoardNo) {
        navigate(`/board/post/${createdBoardNo}`);
        return;
      }

      navigate('/board');
    } catch (err) {
      setError(err.message || '게시물을 생성하는 동안 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrap className="font-(family-name:--f)">
      <div className="flex font-medium">
        <Undo>Back</Undo>
      </div>

      <input
        type="text"
        value={boardTitle}
        onChange={(e) => setBoardTitle(e.target.value)}
        disabled={submitting}
        maxLength={300}
        className="bg-white/10 rounded-md py-2 px-4 text-left font-semibold disabled:opacity-60"
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={boardContent}
        onChange={(e) => setBoardContent(e.target.value)}
        disabled={submitting}
        maxLength={3000}
        placeholder="내용을 입력하세요"
        className="bg-white/10 rounded-2xl min-h-0 flex-1 p-4 text-left whitespace-pre-wrap resize-none disabled:opacity-60"
      />

      {error && <div className="text-sm text-red-200">{error}</div>}

      <Btn type="button" className="self-end disabled:opacity-60" onClick={submit} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </Btn>
    </Wrap>
  );
}
