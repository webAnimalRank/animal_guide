import { CardWrap, Mini } from './villager.style';
import { Wrap } from '../../components/style';
import { useState } from 'react';
import { useVillagersSearch } from './useVillagers';
import { useVillagerFilters } from './useVillagerFilters';
import VillagerDetail from './VillagerDetail';

export default function Villager() {
	const [selectedNo, setSelectedNo] = useState(null);
	const [isSelect, setIsSelect] = useState(false);

	const closeModal = () => {
		setIsSelect(false);
		setSelectedNo(null);
	};

	const { filters, filterConfigs, resetFilters } = useVillagerFilters(closeModal);
	const { data: villagers, loading, error } = useVillagersSearch(filters);

	return (
		<>
			<Wrap>
				<aside className='sticky top-26 flex items-center gap-5 px-4 py-2 bg-(--c) text-white/80 rounded-2xl'>
					<div className='flex gap-3 font-bold'>
						{filterConfigs.map((f) => (
							<select
								key={f.key}
								value={f.value}
								onChange={(e) => {
									f.setState(e.target.value);
									closeModal();
								}}
							>
								{f.options.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						))}
						<button onClick={resetFilters}>초기화</button>
					</div>
				</aside>

				<CardWrap>
					{loading && <div className='w-full text-center py-10'>불러오는 중...</div>}
					{!loading &&
						villagers?.map((v) => (
							<Mini
								key={v.villagerNo}
								onClick={() => {
									setSelectedNo(v.villagerNo);
									setIsSelect(true);
								}}
							>
								<img src={v.villagerImageIcon} alt='' />
								{v.villagerName}
							</Mini>
						))}
				</CardWrap>
			</Wrap>

			<VillagerDetail selectedNo={selectedNo} isOpen={isSelect} onClose={closeModal} />
		</>
	);
}
