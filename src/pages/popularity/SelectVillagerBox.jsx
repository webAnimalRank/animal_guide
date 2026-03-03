import { SelectBox, Txt } from './popularity.style';

/**
 * 선택 가능한 단일 주민 박스
 */
export function SelectVillagerBox({ villager, isChecked, isFull, onToggle }) {
	const buttonText = isChecked ? '해제' : isFull ? '선택 불가' : '선택';

	return (
		<SelectBox key={villager.villagerNo}>
			<img src={villager.villagerImage} alt={villager.villagerName} className='min-h-0 flex-1 object-contain' />
			<span className='name'>{villager.villagerName}</span>
			<input
				type='checkbox'
				name='check'
				className='hidden'
				checked={isChecked}
				onChange={(e) => onToggle(villager, e.target.checked)}
				disabled={!isChecked && isFull}
				aria-label={`${villager.villagerName} 선택`}
			/>
			<Txt>{buttonText}</Txt>
		</SelectBox>
	);
}
