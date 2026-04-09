import { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';
import { Card, Close, List, Load } from './villager.style';
import { Glass } from '../../components/style';
import { getDetailData } from './villager.config';
import { useVillagerDetailStore } from './useDetailStore';

export default function VillagerDetail({ selectedNo, isOpen, onClose }) {
	const [imgLoad, setImgLoad] = useState(false);
	const dialogRef = useRef(null);

	const { detail, detailLoading, detailError, fetchVillagerDetail, clearDetail } = useVillagerDetailStore();

	useEffect(() => {
		if (isOpen && selectedNo) {
			fetchVillagerDetail(selectedNo);
		} else if (!isOpen) {
			clearDetail();
			setImgLoad(false);
		}
	}, [isOpen, selectedNo]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (isOpen) {
			dialog.showModal();
			disableBodyScroll(dialog, { reserveScrollBarGap: true });
		} else {
			dialog.close();
			enableBodyScroll(dialog);
			setImgLoad(false);
		}
		return () => enableBodyScroll(dialog);
	}, [isOpen]);

	return (
		<dialog ref={dialogRef} onClose={onClose}>
			<div className='fixed inset-0 bg-black/30 flex flex-col gap-8 items-center justify-center' onClick={onClose}>
				<Card onClick={(e) => e.stopPropagation()}>
					{detailLoading && <div className='p-10 text-center opacity-70'>불러오는 중...</div>}
					{detailError && <div className='p-10 text-center text-red-500'>에러 발생</div>}
					{!detailLoading && detail && (
						<>
							<Glass className='h-full aspect-2/3 p-6 flex justify-center relative max-md:h-50 self-center'>
								{!imgLoad && <Load />}
								<img
									className={`object-contain ${imgLoad ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
									src={detail.villagerImage}
									onLoad={() => setImgLoad(true)}
									alt=''
								/>
							</Glass>
							<ul className='flex flex-col justify-between max-md:gap-4'>
								{getDetailData(detail).map((item, i) => (
									<li
										key={i}
										className='flex gap-2 items-center text-lg max-sm:text-base border-b-2 border-white/40 pb-1 font-medium break-keep'
									>
										<List>{item.label} :</List>
										{item.label === '이름' ? (
											<div className='flex gap-2 items-center'>
												{item.value.villagerName}
												<span className='text-base max-sm:text-xs'>
													({item.value.villagerNameEn} / {item.value.villagerNameJp})
												</span>
											</div>
										) : (
											item.value
										)}
									</li>
								))}
							</ul>
						</>
					)}
				</Card>
				<Close onClick={onClose}>클릭하여 닫기</Close>
			</div>
		</dialog>
	);
}
