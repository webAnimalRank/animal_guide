import { CheckWrap } from './popularity.style';
import { usePopularityStore } from './useStore';
import { CheckBox, Cancel } from './popularity.style';
import { VillagerImage } from '../villager/Villager';

/* 선택된 주민 박스 */
function Selected({ villager, onRemove }) {
	return (
		<CheckBox key={villager.villagerNo} className='pt-1'>
			<VillagerImage
				className='min-h-0 flex-1'
				src={villager.villagerImageIcon}
				alt={villager.villagerName}
			/>
			{villager.villagerName}
			<Cancel onClick={() => onRemove(villager)} aria-label={`${villager.villagerName} 제거`} />
		</CheckBox>
	);
}

/* 선택 가능한 빈 슬롯 */
function Empty({ label = '선택 가능' }) {
	return (
		<CheckBox className='pt-4 gap-2 empty'>
			<div className='flex-1 aspect-square self-center border-2 border-dashed opacity-50 rounded-xl' />
			{label}
		</CheckBox>
	);
}

export function SelectionPanel() {
	const { selectedIds, selectedVillagerCache, remainingVotes, toggleVillager } = usePopularityStore();

	const selectedVillagers = selectedIds.map((id) => selectedVillagerCache.get(id)).filter(Boolean);

	return (
		<CheckWrap>
			{selectedVillagers.map((villager) => (
				<Selected key={villager.villagerNo} villager={villager} onRemove={(v) => toggleVillager(v, false)} />
			))}
			{selectedIds.length < remainingVotes &&
				Array.from({ length: remainingVotes - selectedIds.length }).map((_, i) => (
					<Empty key={`empty-${i}`} label='선택 가능' />
				))}
		</CheckWrap>
	);
}
