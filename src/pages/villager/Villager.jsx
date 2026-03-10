import { useEffect, useState } from 'react';
import { Wrap } from '../../components/style';
import { CardWrap, Mini } from './villager.style';
import VillagerFilter from './VillagerFilter';
import VillagerDetail from './VillagerDetail';
import { useVillagerStore } from './useStore';

export default function Villager() {
	const [selectedNo, setSelectedNo] = useState(null);
	const [isSelect, setIsSelect] = useState(false);

	const { villagers, loading, fetchVillagerTypes, fetchVillagers, resetFilters } = useVillagerStore();

	useEffect(() => {
		resetFilters();
		fetchVillagerTypes();
		fetchVillagers();
	}, []);

	const closeModal = () => {
		setIsSelect(false);
		setSelectedNo(null);
	};

	return (
		<>
			<Wrap>
				<VillagerFilter onChange={closeModal} />
				<CardWrap>
					{loading && <div>불러오는 중...</div>}
					{villagers?.map((v) => (
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
