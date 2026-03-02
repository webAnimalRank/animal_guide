import { useEffect, useMemo, useState } from 'react';
import { Rank, Title3 } from './home.style';
import { Box } from '../../components/style';
import tom from '../../assets/img/Tom_Nook_NH.png';
import crown from '../../assets/img/crown.svg';
import tomMin from '../../assets/img/tom_icon.png';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Result() {
	const [top3, setTop3] = useState([]);
	const month = new Date().getMonth() + 1;

	useEffect(() => {
		const load = async () => {
			try {
				const res = await fetch(`${API_URL}/api/villagers/votes/top`);
				if (!res.ok) {
					throw new Error('랭킹 조회 실패');
				}
				const data = await res.json();
				setTop3(Array.isArray(data.top3) ? data.top3 : []);
			} catch (e) {
				console.error(e);
				setTop3([]);
			}
		};

		load();
	}, []);

	const rankData = useMemo(() => {
		return top3.map((v, idx) => {
			const rank = idx + 1;
			const shadow = rank === 1 ? 'bg-(--gold)' : rank === 2 ? 'bg-(--silver)' : 'bg-(--bronze)';
			return {
				rank,
				name: v.villagerName,
				votes: v.votes,
				shadow,
				icon: rank === 1 ? crown : v.villagerImageIcon || tomMin
			};
		});
	}, [top3]);

	const topImage = top3[0]?.villagerImage || tom;

	return (
		<Box className='w-120 max-sm:w-full'>
			<Title3 className='star border-(--y)'>{month}월의 인기 주민</Title3>
			<img className='h-60 max-md:h-50 object-contain' src={topImage} alt='이달의 주민' />
			{rankData.length === 0 && <div className='font-bold text-lg py-3'>아직 투표 결과가 없습니다.</div>}
			{rankData.map(({ rank, icon, name, votes, shadow }) => (
				<Rank key={rank} className={shadow}>
					<span className={rank === 1 ? 'text-xl max-md:text-lg' : 'text-lg max-md:text-base'}>{rank}위</span>
					<img className='h-10 max-md:h-8' src={icon} alt='' />
					<span className={rank === 1 ? 'text-2xl font-extrabold' : 'text-xl font-extrabold'}>{name}</span>
					<span className='ml-auto text-lg max-md:text-base font-bold'>{votes}표</span>
				</Rank>
			))}
		</Box>
	);
}
