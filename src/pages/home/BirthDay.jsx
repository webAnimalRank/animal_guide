import { Box, Loading, PageBtn } from '../../components/style';
import { BirthWrap, List, Title3 } from './home.style';
import { useEffect, useState } from 'react';
import { useBirthStore } from './useBirthStore';

export default function BirthDay() {
	const currentMonth = new Date().getMonth() + 1;
	const [loadCount, setLoadCount] = useState(0);

	// 데이터 (상태)
	const { birthVillagers, birthLoading, birthError, currentPage, itemsPerPage } = useBirthStore();

	// 기능 (액션)
	const { fetchBirthVillagers, setCurrentPage, isItemToday, formatBirth } = useBirthStore((state) => state.actions);

	useEffect(() => {
		fetchBirthVillagers(currentMonth);
	}, [currentMonth]);

	useEffect(() => {
		setLoadCount(0);
	}, [currentPage]);

	// 로직 계산
	const totalPages = Math.ceil(birthVillagers.length / itemsPerPage);
	const displayedVillagers = birthVillagers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const isAllLoad = loadCount === displayedVillagers.length;

	if (birthLoading) return <Box className='w-100 h-min'>로딩 중...</Box>;
	if (birthError) return <Box className='w-100 h-min'>에러 발생</Box>;

	return (
		<Box className='w-100 max-sm:w-full h-min'>
			<Title3 className='birth border-(--pink)'>{currentMonth}월 생일</Title3>
			<div className='relative'>
				<BirthWrap key={currentPage} className={isAllLoad ? 'load' : ''}>
					{displayedVillagers.map((item) => (
						<List key={item.villagerNo} className={isItemToday(item.villagerBirth) ? 'today' : ''}>
							<img
								className={`h-14 max-md:h-12 aspect-square object-contain`}
								src={item.villagerImageIcon}
								alt={item.villagerName}
								onLoad={() => setLoadCount((prev) => prev + 1)}
							/>
							<span className='text-2xl max-md:text-xl font-extrabold'>{item.villagerName}</span>
							<span className='text-lg font-bold ml-auto'>{formatBirth(item.villagerBirth)}</span>
						</List>
					))}
				</BirthWrap>
				{!isAllLoad && <Loading className='absolute left-1/2 top-1/2 -translate-1/2  size-30' />}
			</div>
			{birthVillagers.length > 0 && (
				<div className='flex gap-2 justify-center items-center mt-2'>
					<PageBtn
						onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
						disabled={currentPage === 1}
						className='prev'
					/>
					<span className='text-sm font-bold'>
						{currentPage} / {totalPages}
					</span>
					<PageBtn
						onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
						disabled={currentPage === totalPages}
						className='next'
					/>
				</div>
			)}
		</Box>
	);
}
