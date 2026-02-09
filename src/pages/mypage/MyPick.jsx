import { useState } from 'react';
import { Action, ResultBox } from './mypage.style';
import { Btn } from '../../components/style';
import Img from '../../assets/img/Tom_Nook_NH.png';

const data = [
	{ name: '너굴', img: Img },
	{ name: '너굴', img: Img },
	{ name: '너굴', img: Img }
];

export default function MyPick() {
	const [currentDate, setCurrentDate] = useState(() => new Date());
	const monthDisplay = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
	const today = new Date();

	const monthChange = (offset) => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev.getFullYear(), prev.getMonth() + offset, 1);
			today.setDate(1);

			// 현재 달을 넘지 않도록 제한
			if (newDate > today) {
				return prev;
			}
			return newDate;
		});
	};
	const isCurrentMonth =
		currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth();

	return (
		<div className='flex flex-col gap-5 items-center'>
			<div className='flex items-center justify-between w-40 font-bold text-lg'>
				<Action className='prev' onClick={() => monthChange(-1)} />
				{monthDisplay}
				<Action className='next' onClick={() => monthChange(1)} disabled={isCurrentMonth} />
			</div>
			<div className='flex gap-4'>
				{data.map((v, i) => (
					<ResultBox key={i}>
						<img src={v.img} className='min-h-0 flex-1 object-contain' />
						{v.name}
					</ResultBox>
				))}
			</div>
			<Btn>결과 확인</Btn>

			{/* 투표 내역 없고, 투표를 못한 경우 (지난 달 등) */}
			<div className='text-2xl'>투표 내역이 없습니다.</div>

			{/* 투표 가능한 경우 (현재 진행 중인 달) */}
			<div className='text-2xl'>아직 투표하지 않았습니다.</div>
			<Btn>투표하러 가기</Btn>
		</div>
	);
}
