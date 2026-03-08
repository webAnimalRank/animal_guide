import { Wrap } from '../../components/style';
import { Close, Submit, Tip, TipBox, TipText } from './popularity.style';
import { useVillagerFilters } from '../villager/useVillagerFilters';
import { useVillagerTypes, useVillagersSearch } from '../villager/useVillagers';
import VillagerFilter from '../villager/VillagerFilter';
import { usePopularityVotes } from './usePopularityVotes';
import { VillagerList } from './VillagerList';
import { SelectionPanel } from './SelectionPanel';
import { POPULARITY_MESSAGES } from './popularity.constants';

export default function Popularity() {
	const { typeOptions } = useVillagerTypes();
	const { filters, filterConfigs, resetFilters, keyword, setKeyword } = useVillagerFilters(typeOptions);
	const { data: villagers, loading, error } = useVillagersSearch(filters);
	const { selectedIds, selectedVillagers, remainingVotes, submitting, toggleVillager, submitVotes, maxVotes } =
		usePopularityVotes();

	const filterProps = {
		filterConfigs,
		keyword,
		setKeyword,
		onReset: resetFilters
	};

	const villagerListProps = {
		villagers,
		loading,
		error,
		selectedIds,
		remainingVotes,
		onToggle: toggleVillager
	};

	const selectionPanelProps = {
		selectedVillagers,
		selectedIds,
		remainingVotes,
		onRemove: (v) => toggleVillager(v, false)
	};

	const handleSubmit = async () => {
		const result = await submitVotes();
		alert(result.message);
	};

	return (
		<Wrap className='h-0! fixed max-sm:inset-0'>
			<div className='flex justify-between items-center relative'>
				<h2 className='font-bold text-2xl self-start'>{POPULARITY_MESSAGES.TITLE}</h2>
				<TipBox>
					<Tip>투표 방법</Tip>
					<TipText>
						가장 마음에 드는 주민 <strong>{maxVotes}명</strong>을 선택하고 <strong>투표 완료</strong> 버튼을 눌러주세요.
						<Close>닫기</Close>
					</TipText>
				</TipBox>
			</div>
			<div className='flex-1 min-h-0 bg-white/10 rounded-2xl relative flex flex-col gap-2 p-2'>
				<VillagerFilter {...filterProps} />
				<VillagerList {...villagerListProps} />
			</div>
			<div className='flex flex-0 gap-3 justify-between max-sm:flex-col sm:pt-2'>
				<SelectionPanel {...selectionPanelProps} />
				<Submit disabled={selectedIds.length < remainingVotes} onClick={handleSubmit}>
					{submitting ? POPULARITY_MESSAGES.SUBMITTING : POPULARITY_MESSAGES.SUBMIT_READY}
				</Submit>
			</div>
		</Wrap>
	);
}
