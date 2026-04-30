import toast from 'react-hot-toast';
import VillagerFilter from '../villager/VillagerFilter';
import {
  Close,
  Submit,
  Tip,
  TipBox,
  TipText,
  LinkBtn,
  BlurBg
} from './popularity.style';
import { SelectionPanel } from './SelectionPanel';
import { MAX_VOTES, usePopularityStore } from './useStore';
import { VillagerList } from './VillagerList';
import { useVillagerStore } from '../villager/useStore';
import { useFetchStore } from '../../store/useFetchStore';
import { useEffect } from 'react';

export default function Vote() {
  const {
    submitting,
    remainingVotes,
    selectedIds,
    submitVotes,
    fetchVoteStatus,
    resetSelectedIds
  } = usePopularityStore();
  const { villagers, member } = useFetchStore();
  const { loading, error, fetchVillagerTypes, resetFilters } =
    useVillagerStore();

  useEffect(() => {
    resetSelectedIds();
    resetFilters();

    if (member) {
      fetchVoteStatus();
    }
    fetchVillagerTypes();
  }, [member]);

  const handleSubmit = async () => {
    const result = await submitVotes();

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className='flex justify-between items-center relative'>
        <h2 className='font-bold text-2xl self-start'>주민 인기 투표</h2>
        <TipBox>
          <Tip>투표 방법</Tip>
          <TipText>
            가장 마음에 드는 주민 <strong>{MAX_VOTES}명</strong>을 선택하고{' '}
            <strong>투표 완료</strong> 버튼을 눌러주세요.
            <Close>닫기</Close>
          </TipText>
        </TipBox>
      </div>
      <div className='flex-1 min-h-0 bg-white/10 rounded-2xl relative flex flex-col gap-2 p-2'>
        <VillagerFilter />
        <VillagerList villagers={villagers} loading={loading} error={error} />
      </div>
      <div className='flex flex-0 gap-3 justify-between max-sm:flex-col sm:pt-2'>
        <SelectionPanel />
        <Submit
          disabled={submitting || selectedIds.length < remainingVotes}
          onClick={handleSubmit}
        >
          투표
        </Submit>
      </div>
      {member && remainingVotes === 0 && (
        <BlurBg>
          이번 달 투표를 완료했습니다.
          <LinkBtn to='/' className='home'>
            홈으로
          </LinkBtn>
        </BlurBg>
      )}
      {!member && (
        <BlurBg>
          로그인 후 투표 가능합니다.
          <LinkBtn to='/login' className='login'>
            로그인
          </LinkBtn>
        </BlurBg>
      )}
    </>
  );
}
