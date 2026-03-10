import { Box, PageBtn } from '../../components/style';
import { List, Title3 } from './home.style';
import { useEffect, useState } from 'react';
import { useBirthStore } from './useBirthStore';

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
			<span className='text-lg font-bold ml-auto'>{birth}</span>
		</List>
	);
};

export default function BirthDay() {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const currentMonth = new Date().getMonth() + 1;

	const { birthVillagers, birthLoading, birthError, fetchBirthVillagers, isItemToday, getStatusMessage, formatBirth } =
		useBirthStore();

	useEffect(() => {
		fetchBirthVillagers(currentMonth);
	}, []);

	const statusMessage = getStatusMessage(currentMonth);

	const totalPages = Math.ceil(birthVillagers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const displayedVillagers = birthVillagers.slice(startIndex, startIndex + itemsPerPage);

	const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
	const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
							birth={formatBirth(item.villagerBirth)}
						/>
					))}
			</ul>
			{!birthLoading && !birthError && birthVillagers.length > 0 && (
				<div className='flex gap-2 justify-center items-center'>
					<PageBtn onClick={handlePrev} disabled={currentPage === 1} className='prev' />
					<span className='text-sm font-bold'>
						{currentPage} / {totalPages}
					</span>
					<PageBtn onClick={handleNext} disabled={currentPage === totalPages} className='next' />
				</div>
			)}
		</Box>
	);
}
