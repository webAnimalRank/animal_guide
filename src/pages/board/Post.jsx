import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usePostAction from './usePostAction';
import { Btn, Loading, Wrap } from '../../components/style';
import { Undo } from './board.style';

export default function Post() {
  const navigate = useNavigate();
  const { boardNo } = useParams();

  const { state } = useLocation();
  const kindTitle = state?.boardKind === 'notice' ? '공지사항' : '자유게시판';

  const {
    parsedBoardNo,
    data,
    loading,
    fetchError,
    actionError,
    isOwner,
    isProcessing,
    handleRemove,
    isValidBoardNo
  } = usePostAction(boardNo);

  if (!isValidBoardNo) {
    return <Wrap>Invalid post URL.</Wrap>;
  }

  if (loading) {
    return (
      <Wrap className="justify-center items-center">
        <Loading className="size-20 max-sm:size-10" />
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

  return (
    <Wrap className="font-(family-name:--f)">
      <h2 className="self-start text-xl font-bold font-(family-name:--f2) flex gap-3 items-center">
        {kindTitle}
      </h2>
      <div className="flex font-medium justify-between items-center gap-3">
        <Undo>목록</Undo>

        {isOwner && (
          <div className="flex">
            <Btn onClick={() => navigate(`/board/edit/${parsedBoardNo}`)}>
              수정
            </Btn>
            <Btn onClick={handleRemove} disabled={isProcessing}>
              삭제
            </Btn>
          </div>
        )}
      </div>

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
    </Wrap>
  );
}
