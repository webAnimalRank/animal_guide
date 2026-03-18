import { useEffect, useState } from 'react';
import { Action, ResultBox } from './mypage.style';
import { Btn, Loading } from '../../components/style';
import Img from '../../assets/img/Tom_Nook_NH.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const data = [
// 	{ name: '너굴', img: Img },
// 	{ name: '너굴', img: Img },
// 	{ name: '너굴', img: Img }
// ];

// 🔹 VillagerImage 컴포넌트 (로딩/에러 처리)
export function VillagerImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {!loaded && !error && <Loading className="absolute size-18" />}
      <img
        className={loaded ? 'load' : ''}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {error && <span className="text-xs text-red-500">이미지 로드 실패</span>}
    </div>
  );
}

export default function MyPick() {
	const [currentDate, setCurrentDate] = useState(() => new Date());
    //const [voteStatus, setVoteStatus] = useState(null);
	const [pickedVillagers, setPickedVillagers] = useState([]);
	const navigate = useNavigate();

	const monthDisplay = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
	const today = new Date();
	//const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	
	const monthChange = (offset) => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev.getFullYear(), prev.getMonth() + offset, 1);
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
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1;

		getMyVotes(year, month)
		.then((res) => {
			setPickedVillagers(res.data);
		})
		.catch((err) => {
			console.error('투표 목록 불러오기 실패:', err);
			setPickedVillagers([]);
		});

	}, [currentDate]); // 👈 이거 중요 (월 바뀔 때마다 실행)

	// 투표/결과 페이지 이동
	const handleVoteClick = () => {
		navigate('/popularity');
		};
	// 🔹 이번 달에 투표했는지 확인
	const hasVotedThisMonth = pickedVillagers.length > 0;

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
							<VillagerImage
								src={v.villagerImageIcon || Img} // null이면 기본 이미지
								alt={v.villagerName}
								className="min-h-0 flex-1 object-contain"
							/>
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

				{/* 투표/결과 버튼 */}
				{!hasVotedThisMonth && isCurrentMonth && (
					<Btn onClick={handleVoteClick}>
					투표하러 가기
					</Btn>
				)}
				{/* 결과 확인 버튼은 항상 표시하고 싶으면 아래처럼 추가 가능 */}
				{hasVotedThisMonth && !isCurrentMonth && (
					<Btn onClick={handleVoteClick}>
					결과 확인
					</Btn>
				)}

		</div>
	);
}
