import { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';
import { Card, Close, List } from './villager.style';
import { Glass } from '../../components/style';
import { useVillagerDetail } from './useVillagers';
import { getDetailData } from './villager.config';

export default function VillagerDetail({ selectedNo, isOpen, onClose }) {
	const dialogRef = useRef(null);
	const { data: detail, loading, error } = useVillagerDetail(selectedNo, isOpen);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (isOpen) {
			dialog.showModal();
			disableBodyScroll(dialog, { reserveScrollBarGap: true });
		} else {
			dialog.close();
			enableBodyScroll(dialog);
		}
		return () => enableBodyScroll(dialog);
	}, [isOpen]);

	return (
		<dialog ref={dialogRef} onClose={onClose}>
			<div className='fixed inset-0 bg-black/30 flex flex-col gap-8 items-center justify-center' onClick={onClose}>
				<Card onClick={(e) => e.stopPropagation()}>
					{loading && <div className='p-10 text-center opacity-70'>불러오는 중...</div>}
					{error && <div className='p-10 text-center text-red-500'>에러 발생</div>}
					{!loading && detail && (
						<>
							<Glass className='h-full aspect-2/3 p-6 flex justify-center'>
								<img className='object-contain' src={detail.villagerImage} alt='' />
							</Glass>
							<ul className='flex flex-col justify-between max-md:gap-5'>
								{getDetailData(detail).map((item, i) => (
									<li key={i} className='flex gap-5 items-center text-xl'>
										<List>{item.label}</List>
										{item.value}
									</li>
								))}
							</ul>
						</>
					)}
				</Card>
				<Close onClick={onClose}>닫기</Close>
			</div>
		</dialog>
	);
}
