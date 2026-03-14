import { useEffect } from 'react';
import { Wrap } from '../../components/style';
import { Tip, TipBox, TipText, Close, Submit } from './popularity.style';
import VillagerFilter from '../villager/VillagerFilter';
import { VillagerList } from './VillagerList';
import { SelectionPanel } from './SelectionPanel';
import { usePopularityStore, MAX_VOTES } from './useStore';
import { useVillagerStore } from '../villager/useStore';

export default function Popularity() {
	const { villagers, loading, error, fetchVillagerTypes, fetchVillagers, resetFilters } = useVillagerStore();
	const { fetchVoteStatus, submitVotes, submitting, remainingVotes, selectedIds } = usePopularityStore();

	useEffect(() => {
		resetFilters();

		fetchVoteStatus(); // 내 투표 현황 조회
		fetchVillagerTypes(); // 종족 필터 옵션 조회
		fetchVillagers(); // 주민 목록 조회
	}, []);

	const handleSubmit = async () => {
		const result = await submitVotes();
		alert(result.message);
	};

	return (
		<Wrap className='h-0! fixed max-sm:inset-0'>
			<div className='flex justify-between items-center relative'>
				<h2 className='font-bold text-2xl self-start'>주민 인기 투표</h2>
				<TipBox>
					<Tip>투표 방법</Tip>
					<TipText>
						가장 마음에 드는 주민 <strong>{MAX_VOTES}명</strong>을 선택하고 <strong>투표 완료</strong> 버튼을
						눌러주세요.
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
				<Submit disabled={selectedIds.length < remainingVotes} onClick={handleSubmit}>
					{submitting ? '처리 중...' : '투표 완료'}
				</Submit>
			</div>
		</Wrap>
	);
}
