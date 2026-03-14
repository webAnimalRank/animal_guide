import { usePopularityStore } from './useStore';
import { SelectBox, SelectWrap, Txt } from './popularity.style';
import { VillagerImage } from '../villager/Villager';
import { Loading } from '../../components/style';

/* 주민 목록 (로딩/에러/데이터) */
export function VillagerList({ villagers, loading, error }) {
	const { selectedIds, remainingVotes, toggleVillager } = usePopularityStore();

	return (
		<>
			{loading && (
				<div className='absolute inset-0 z-40 self-center flex flex-col items-center gap-3'>
					<Loading className='size-10' />
					불러오는 중...
				</div>
			)}
			{!loading && error && <div className='p-4 font-bold text-red-500'>목록 조회에 실패했습니다.</div>}
			<SelectWrap>
				{villagers?.map((villager) => {
					const isChecked = selectedIds.includes(villager.villagerNo);
					const isFull = selectedIds.length >= remainingVotes;

					return (
						<SelectBox key={villager.villagerNo}>
							<VillagerImage src={villager.villagerImage} alt={villager.villagerName} className='min-h-0 size-full' />
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
		</>
	);
}
