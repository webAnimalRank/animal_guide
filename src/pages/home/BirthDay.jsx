import { Box } from '../../components/style';
import { Title3 } from './home.style';
import { useVillagersSearch } from '../villager/useVillagers';

const formatBirthday = (birth) => {
	if (!birth || typeof birth !== 'string' || !birth.includes('-')) return '-';
	const [month, day] = birth.split('-');
	return `${Number(month)}월 ${Number(day)}일`;
};

export default function BirthDay() {
	const currentMonth = new Date().getMonth() + 1;
	const { data: villagers, loading, error } = useVillagersSearch({ birthMonth: currentMonth });
	const monthVillagers = (villagers ?? []).slice(0, 3);

	return (
		<Box className='shadow-(--shadowP) w-100 max-sm:w-full'>
			<Title3 className='birth border-(--pink)'>{currentMonth}월 생일</Title3>
			<ul className='flex flex-col gap-2 max-md:gap-0'>
				{loading && <li className='h-15 flex items-center text-lg font-bold'>불러오는 중...</li>}
				{!loading && error && (
					<li className='h-15 flex items-center text-lg font-bold'>데이터를 불러오지 못했습니다.</li>
				)}
				{!loading &&
					!error &&
					monthVillagers.map((item) => (
						<li key={item.villagerNo} className='h-15 flex items-center gap-4 max-md:gap-2 pr-2'>
							<img className='h-14 max-md:h-12 object-contain' src={item.villagerImageIcon} alt={item.villagerName} />
							<span className='text-2xl max-md:text-xl font-extrabold'>{item.villagerName}</span>
							<span className='text-lg font-bold ml-auto'>{formatBirthday(item.villagerBirth)}</span>
						</li>
					))}
				{!loading && !error && monthVillagers.length === 0 && (
					<li className='h-15 flex items-center text-lg font-bold'>{currentMonth}월 생일 주민이 없습니다.</li>
				)}
			</ul>
		</Box>
	);
}
