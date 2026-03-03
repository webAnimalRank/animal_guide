import { SelectWrap } from './popularity.style';
import { SelectVillagerBox } from './SelectVillagerBox';
import { POPULARITY_MESSAGES } from './popularity.constants';

/**
 * 주민 목록 (로딩/에러/데이터)
 */
export function VillagerList({ villagers, loading, error, selectedIds, remainingVotes, onToggle }) {
	return (
		<SelectWrap>
			{loading && <div className='p-4 font-bold'>{POPULARITY_MESSAGES.LOADING}</div>}
			{!loading && error && <div className='p-4 font-bold text-red-500'>{POPULARITY_MESSAGES.ERROR}</div>}
			{!loading &&
				!error &&
				villagers.map((villager) => (
					<SelectVillagerBox
						key={villager.villagerNo}
						villager={villager}
						isChecked={selectedIds.includes(villager.villagerNo)}
						isFull={selectedIds.length >= remainingVotes}
						onToggle={onToggle}
					/>
				))}
		</SelectWrap>
	);
}
