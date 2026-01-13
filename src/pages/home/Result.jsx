import { Rank, Title3 } from './home.style';
import { Box } from '../../components/style';
import tom from '../../assets/img/Tom_Nook_NH.png';
import crown from '../../assets/img/crown.svg';
import tom_min from '../../assets/img/tom_icon.png';

const rankData = [
	{ rank: '1등', img: crown, name: '너굴', votes: 333, shadow: 'bg-(--gold)' },
	{ rank: '2등', img: tom_min, name: '너굴', votes: 222, shadow: 'bg-(--silver)' },
	{ rank: '3등', img: tom_min, name: '너굴', votes: 111, shadow: 'bg-(--bronze)' }
];

export default function Result() {
	return (
		<Box className='shadow-(--shadowY) w-120'>
			<Title3 className='star border-(--y)'>이달의 주민</Title3>
			<img className='h-60 object-contain' src={tom} alt='' />
			{rankData.map(({ rank, img, name, votes, shadow }) => (
				<Rank key={rank} className={shadow}>
					<span className={rank === '1등' ? 'text-xl' : 'text-lg'}>{rank}</span>
					<img className='h-10' src={img} alt='' />
					<span className={rank === '1등' ? 'text-2xl font-extrabold' : 'text-xl font-extrabold'}>{name}</span>
					<span className='ml-auto text-lg font-bold'>{votes}표</span>
				</Rank>
			))}
		</Box>
	);
}
