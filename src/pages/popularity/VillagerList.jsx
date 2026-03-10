import { usePopularityStore } from './useStore';
import { SelectBox, SelectWrap, Txt } from './popularity.style';
import { POPULARITY_MESSAGES } from './popularity.constants';

/* 주민 목록 (로딩/에러/데이터) */
export function VillagerList({ villagers, loading, error }) {
	const { selectedIds, remainingVotes, toggleVillager } = usePopularityStore();

	return (
		<SelectWrap>
			{loading && <div className='p-4 font-bold'>{POPULARITY_MESSAGES.LOADING}</div>}
			{!loading && error && <div className='p-4 font-bold text-red-500'>{POPULARITY_MESSAGES.ERROR}</div>}
			{villagers?.map((villager) => {
				const isChecked = selectedIds.includes(villager.villagerNo);
				const isFull = selectedIds.length >= remainingVotes;

				return (
					<SelectBox key={villager.villagerNo}>
						<img src={villager.villagerImage} alt={villager.villagerName} className='min-h-0 flex-1 object-contain' />
						<span className='name'>{villager.villagerName}</span>
						<input
							type='checkbox'
							name='check'
							className='hidden'
							checked={isChecked}
							onChange={(e) => toggleVillager(villager, e.target.checked)}
							disabled={!isChecked && isFull}
							aria-label={`${villager.villagerName} 선택`}
						/>
						<Txt>{isChecked ? '해제' : isFull ? '선택 불가' : '선택'}</Txt>
					</SelectBox>
				);
			})}
		</SelectWrap>
	);
}
