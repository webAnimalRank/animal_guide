import { CheckWrap } from './popularity.style';
import { SelectedVillagerBox, EmptyVoteSlot } from './SelectedVillagerBox';
import { POPULARITY_MESSAGES } from './popularity.constants';

/**
 * 선택된 주민들 표시 영역
 */
export function SelectionPanel({ selectedVillagers, selectedIds, remainingVotes, onRemove }) {
	return (
		<CheckWrap>
			{selectedVillagers.map((villager) => (
				<SelectedVillagerBox key={villager.villagerNo} villager={villager} onRemove={onRemove} />
			))}
			{selectedIds.length < remainingVotes &&
				Array.from({ length: remainingVotes - selectedIds.length }).map((_, i) => (
					<EmptyVoteSlot key={`empty-${i}`} label={POPULARITY_MESSAGES.EMPTY_OPTION} />
				))}
		</CheckWrap>
	);
}
