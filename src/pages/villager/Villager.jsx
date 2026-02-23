import { useState } from 'react';
import { Wrap } from '../../components/style';
import { CardWrap, Mini } from './villager.style';
import { useVillagersSearch } from './useVillagers';
import { useVillagerFilters } from './useVillagerFilters';
import VillagerFilter from './VillagerFilter';
import VillagerDetail from './VillagerDetail';

export default function Villager() {
	const [selectedNo, setSelectedNo] = useState(null);
	const [isSelect, setIsSelect] = useState(false);

	const closeModal = () => {
		setIsSelect(false);
		setSelectedNo(null);
	};

	const { filters, filterConfigs, resetFilters, keyword, setKeyword } = useVillagerFilters(closeModal);
	const { data: villagers, loading, error } = useVillagersSearch(filters);

	return (
		<>
			<Wrap>
				<VillagerFilter
					filterConfigs={filterConfigs}
					keyword={keyword}
					setKeyword={setKeyword}
					onReset={resetFilters}
					onChange={closeModal}
				/>

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
