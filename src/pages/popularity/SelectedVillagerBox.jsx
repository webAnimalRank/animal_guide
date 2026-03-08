import { CheckBox, Cancel } from './popularity.style';

/**
 * 선택된 주민 박스
 */
export function SelectedVillagerBox({ villager, onRemove }) {
	return (
		<CheckBox key={villager.villagerNo}>
			<img className='object-contain min-h-0 flex-1' src={villager.villagerImageIcon} alt={villager.villagerName} />
			{villager.villagerName}
			<Cancel onClick={() => onRemove(villager)} aria-label={`${villager.villagerName} 제거`} />
		</CheckBox>
	);
}

/**
 * 선택 가능한 빈 슬롯
 */
export function EmptyVoteSlot({ label = '선택 가능' }) {
	return (
		<CheckBox className='pt-4 gap-2 empty'>
			<div className='flex-1 aspect-square self-center border-2 border-dashed opacity-50 rounded-xl' />
			{label}
		</CheckBox>
	);
}
