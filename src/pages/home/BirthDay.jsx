import { Box, PageBtn } from '../../components/style';
import { List, Title3 } from './home.style';
import { useEffect, useMemo, useState } from 'react';
import { useVillagerStore } from '../villager/useStore';

const formatBirthday = (birth) => {
	if (!birth || typeof birth !== 'string' || !birth.includes('-')) return '-';
	const [month, day] = birth.split('-');
	return `${Number(day)}일`;
};

const BirthList = ({ isToday, src, alt, name, birth }) => {
	const [isLoad, setIsLoad] = useState(false);

	return (
		<List
			className={`${isToday ? 'today' : ''} ${isLoad ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
		>
			<img
				className={`h-14 max-md:h-12 aspect-square object-contain`}
				src={src}
				alt={alt}
				onLoad={() => setIsLoad(true)}
			/>
			<span className='text-2xl max-md:text-xl font-extrabold'>{name}</span>
			<span className='text-lg font-bold ml-auto'>{formatBirthday(birth)}</span>
		</List>
	);
};

export default function BirthDay() {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const currentMonth = new Date().getMonth() + 1;

	const { birthdayVillagers, birthdayLoading, birthDayError, fetchBirthdayVillagers } = useVillagerStore();

	useEffect(() => {
		fetchBirthdayVillagers(currentMonth);
	}, []);

	const monthVillagers = useMemo(() => {
		return [...birthdayVillagers].sort((a, b) => {
			const aDay = Number(a?.villagerBirth?.split('-')[1]) || 99;
			const bDay = Number(b?.villagerBirth?.split('-')[1]) || 99;
			return aDay - bDay;
		});
	}, [birthdayVillagers]);

	const totalPages = Math.ceil(monthVillagers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const displayedVillagers = monthVillagers.slice(startIndex, startIndex + itemsPerPage);

	const today = new Date();
	const todayMonth = today.getMonth() + 1;
	const todayDay = today.getDate();

	const isItemToday = (birth) => {
		const [m, d] = String(birth ?? '').split('-');
		return Number(m) === todayMonth && Number(d) === todayDay;
	};

	const statusMessage = birthdayLoading
		? '불러오는 중...'
		: birthDayError
			? '데이터를 불러오지 못했습니다.'
			: monthVillagers.length === 0
				? `${currentMonth}월 생일 주민이 없습니다.`
				: null;

	return (
		<Box className='w-100 max-sm:w-full h-min'>
			<Title3 className='birth border-(--pink)'>{currentMonth}월 생일</Title3>
			<ul className='grid grid-rows-[repeat(5,3.75rem)] gap-2 max-md:gap-0 items-center'>
				{statusMessage && <li className='text-lg font-bold'>{statusMessage}</li>}
				{!statusMessage &&
					displayedVillagers.map((item) => (
						<BirthList
							key={item.villagerNo}
							isToday={isItemToday(item.villagerBirth)}
							src={item.villagerImageIcon}
							alt={item.villagerName}
							name={item.villagerName}
							birth={item.villagerBirth}
						/>
					))}
			</ul>
			{!birthdayLoading && !birthDayError && monthVillagers.length > 0 && (
				<div className='flex gap-2 justify-center items-center'>
					<PageBtn
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className='prev'
					/>
					<span className='text-sm font-bold'>
						{currentPage} / {totalPages}
					</span>
					<PageBtn
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages}
						className='next'
					/>
				</div>
			)}
		</Box>
	);
}
