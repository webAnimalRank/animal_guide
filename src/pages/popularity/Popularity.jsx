import { useEffect, useMemo, useState } from 'react';
import { Wrap } from '../../components/style';
import { SelectBox, SelectWrap, Txt, CheckBox, Submit, Close, CheckWrap } from './popularity.style';
import { useVillagerFilters } from '../villager/useVillagerFilters';
import { useVillagerTypes, useVillagersSearch } from '../villager/useVillagers';
import VillagerFilter from '../villager/VillagerFilter';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const MAX = 3;

export default function Popularity() {
	const [selectedIds, setSelectedIds] = useState([]);
	const [selectedVillagerCache, setSelectedVillagerCache] = useState(new Map());
	const [remainingVotes, setRemainingVotes] = useState(MAX);
	const [submitting, setSubmitting] = useState(false);
	const { typeOptions } = useVillagerTypes();

	const { filters, filterConfigs, resetFilters, keyword, setKeyword } = useVillagerFilters(typeOptions);
	const { data: villagers, loading, error } = useVillagersSearch(filters);

	const selectedVillagers = useMemo(() => {
		return selectedIds.map((id) => selectedVillagerCache.get(id)).filter(Boolean);
	}, [selectedIds, selectedVillagerCache]);

	useEffect(() => {
		const load = async () => {
			try {
				const statusRes = await fetch(`${API_URL}/api/villagers/votes/me`, {
					credentials: 'include'
				});

				if (statusRes.ok) {
					const statusData = await statusRes.json();
					setRemainingVotes(statusData.remainingVotes ?? MAX);
				} else {
					setRemainingVotes(MAX);
				}
			} catch (e) {
				console.error(e);
				setRemainingVotes(MAX);
			}
		};

		load();
	}, []);

	const check = (id, checked) => {
		if (!checked) {
			setSelectedIds((prev) => prev.filter((v) => v !== id));
			return;
		}
		if (selectedIds.length >= remainingVotes) {
			return;
		}
		// cache full object if available
		const villager = villagers.find((v) => v.villagerNo === id);
		if (villager) {
			setSelectedVillagerCache((prev) => new Map(prev).set(id, villager));
		}
		setSelectedIds((prev) => [...prev, id]);
	};

	const submitVotes = async () => {
		if (selectedIds.length === 0) {
			return;
		}

		try {
			setSubmitting(true);
			const res = await fetch(`${API_URL}/api/villagers/votes`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ villagerNos: selectedIds })
			});

			if (!res.ok) {
				let msg = '투표 처리에 실패했습니다.';
				try {
					const errData = await res.json();
					if (errData?.message) msg = errData.message;
				} catch {
					// no-op
				}
				throw new Error(msg);
			}

			const data = await res.json();
			setRemainingVotes(data.remainingVotes ?? 0);
			setSelectedIds([]);
			setSelectedVillagerCache(new Map());
			alert('투표가 완료되었습니다.');
		} catch (e) {
			console.error(e);
			alert(e.message ?? '투표 중 오류가 발생했습니다.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Wrap className='h-0! fixed max-sm:inset-0'>
			<h2 className='font-bold text-2xl self-start'>주민 인기 투표</h2>
			<span className='self-start'>
				투표 방법 : 가장 마음에 드는 주민 <strong>3명</strong>을 선택하고 '투표 완료' 버튼을 눌러주세요.
			</span>
			<div className='flex-1 min-h-0 bg-white/10 rounded-2xl relative flex flex-col gap-3 p-4 pr-2'>
				<VillagerFilter
					filterConfigs={filterConfigs}
					keyword={keyword}
					setKeyword={setKeyword}
					onReset={resetFilters}
				/>
				<SelectWrap>
					{loading && <div className='p-4 font-bold'>불러오는 중...</div>}
					{!loading && error && <div className='p-4 font-bold text-red-500'>목록 조회에 실패했습니다.</div>}
					{!loading &&
						!error &&
						villagers.map((v) => {
							const isChecked = selectedIds.includes(v.villagerNo);
							const isFull = selectedIds.length >= remainingVotes;
							const text = isChecked ? '해제' : isFull ? '선택 불가' : '선택';

							return (
								<SelectBox key={v.villagerNo}>
									<img src={v.villagerImage} alt={v.villagerName} className='min-h-0 flex-1 object-contain' />
									<span className='name'>{v.villagerName}</span>
									<input
										type='checkbox'
										name='check'
										className='hidden'
										checked={isChecked}
										onChange={(e) => check(v.villagerNo, e.target.checked)}
										disabled={!isChecked && isFull}
									/>
									<Txt>{text}</Txt>
								</SelectBox>
							);
						})}
					<div className='absolute inset-0 bg-linear-[180deg,transparent_90%,rgba(0,0,0,0.2)_100%] pointer-events-none rounded-2xl' />
				</SelectWrap>
			</div>
			<div className='flex flex-0 gap-3 justify-between max-sm:flex-col sm:pt-2'>
				<CheckWrap>
					{selectedVillagers.map((v) => (
						<CheckBox key={v.villagerNo}>
							<img className='object-contain min-h-0 flex-1' src={v.villagerImageIcon} alt={v.villagerName} />
							{v.villagerName}
							<Close onClick={() => check(v.villagerNo, false)}></Close>
						</CheckBox>
					))}
					{selectedIds.length < remainingVotes &&
						Array.from({ length: remainingVotes - selectedIds.length }).map((_, i) => (
							<CheckBox key={`empty-${i}`} className='pt-4 gap-2 empty'>
								<div className='flex-1 aspect-square self-center border-2 border-dashed opacity-50 rounded-xl' />
								선택 가능
							</CheckBox>
						))}
				</CheckWrap>
				<Submit disabled={selectedIds.length < remainingVotes} onClick={submitVotes}>
					{submitting ? '처리 중...' : '투표 완료'}
				</Submit>
			</div>
		</Wrap>
	);
}
