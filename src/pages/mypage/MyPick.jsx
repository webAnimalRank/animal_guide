import { useEffect, useState } from 'react';
import { Action, ResultBox } from './mypage.style';
import { Btn } from '../../components/style';
import Img from '../../assets/img/Tom_Nook_NH.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL;


const data = [
	{ name: '너굴', img: Img },
	{ name: '너굴', img: Img },
	{ name: '너굴', img: Img }
];

export default function MyPick() {
	const [currentDate, setCurrentDate] = useState(() => new Date());
    const [voteStatus, setVoteStatus] = useState(null);
	const [pickedVillagers, setPickedVillagers] = useState([]);
	const navigate = useNavigate();

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

 	// 내 투표 현황 불러오기
	useEffect(() => {
		const token = localStorage.getItem('token'); // JWT 토큰
		if (!token) return;

		axios
		.get(`${API_URL}/api/villagers/votes/me`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((res) => {
			setVoteStatus(res.data);
		})
		.catch((err) => {
			console.error('투표 현황 불러오기 실패:', err);
		});

		// 선택한 동물 리스트 불러오기 (예시)
		axios
		.get(`${API_URL}/api/villagers/votes/me/list`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((res) => {
			setPickedVillagers(res.data); // [{ villagerName, villagerImageIcon }, ...]
		})
		.catch(() => {
			setPickedVillagers([]);
		});
	}, [currentDate]);

	// 투표하기버튼 클릭 핸들러
  	const handleVoteClick = () => {
    	navigate('/popularity'); // popularity 페이지로 이동
  	};

	return (
		<div className='flex flex-col gap-5 items-center'>
			<div className='flex items-center justify-between w-40 font-bold text-lg'>
				<Action className='prev' onClick={() => monthChange(-1)} />
				{monthDisplay}
				<Action className='next' onClick={() => monthChange(1)} disabled={isCurrentMonth} />
			</div>
			{/* <div className='flex gap-4'>
				{data.map((v, i) => (
					<ResultBox key={i}>
						<img src={v.img} className='min-h-0 flex-1 object-contain' alt='' />
						{v.name}
					</ResultBox>
				))}
			</div>
			<Btn>결과 확인</Btn>

			<div className='text-2xl'>투표 내역이 없습니다.</div>

			<div className='text-2xl'>아직 투표하지 않았습니다.</div>
			<Btn>투표하러 가기</Btn> */}

			{/* 투표한 동물 리스트 */}
				{pickedVillagers.length > 0 ? (
					<div className="flex gap-4">
					{pickedVillagers.map((v, i) => (
						<ResultBox key={i}>
						<img src={v.villagerImageIcon || Img} className="min-h-0 flex-1 object-contain" alt="" />
						{v.villagerName}
						</ResultBox>
					))}
					</div>
				) : (
					<div className="text-2xl">
					{isCurrentMonth ? '아직 투표하지 않았습니다.' : '투표 내역이 없습니다.'}
					</div>
				)}

				{/* 투표 현황 */}
				{voteStatus && (
					<div className="flex flex-col items-center gap-2">
					<div>이번 달 사용 투표: {voteStatus.usedVotes}</div>
					<div>남은 투표: {voteStatus.remainingVotes}</div>
					</div>
				)}

				{/* 버튼 */}
				<Btn onClick={handleVoteClick}>
					{isCurrentMonth ? '투표하러 가기' : '결과 확인'}
				</Btn>

		</div>
	);
}

