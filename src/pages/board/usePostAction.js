import { useNavigate } from 'react-router-dom';
import { useFetchStore } from '../../store/useFetchStore';
import { usePostStore } from './usePostStore';
import { useBoardDetail } from './useBoardDetail';
import { confirmToast } from '../../components/Confirm';
import toast from 'react-hot-toast';

export default function usePostAction(boardNo) {
  const navigate = useNavigate();
  const member = useFetchStore((state) => state.member);
  const { isProcessing, deleteBoard, error: actionError } = usePostStore();

  const parsedBoardNo = Number(boardNo);
  const {
    data,
    loading,
    error: fetchError
  } = useBoardDetail(parsedBoardNo, !!parsedBoardNo);

  const isOwner = member && data && member.memberNo === data.memberNo;

  const handleRemove = (target, onSuccess, onCancel) => {
    const targetId = typeof target === 'number' ? target : parsedBoardNo;

    if (isProcessing) return;

    confirmToast({
      message: '게시물을 삭제하시겠습니까?',
      onConfirm: async () => {
        await toast.promise(deleteBoard(targetId), {
          loading: '삭제 중...',
          success: '삭제되었습니다.',
          error: '삭제 실패'
        });
        if (targetId === parsedBoardNo) {
          navigate('/board');
        }
        if (onSuccess) onSuccess();
      },
      onCancel: () => {
        if (onCancel) onCancel();
      }
    });
  };

  const isValidBoardNo = Number.isInteger(parsedBoardNo) && parsedBoardNo > 0;

  return {
    parsedBoardNo,
    data,
    loading,
    fetchError,
    actionError,
    isOwner,
    isProcessing,
    handleRemove,
    isValidBoardNo
  };
}
