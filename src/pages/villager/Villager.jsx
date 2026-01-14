import { CardWrap, Mini } from './villager.style';
import mini from '../../assets/img/tom_icon.png';

const data = [
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini },
	{ name: '너굴', img: mini }
];

export default function Villager() {
	return (
		<div className='h-full pt-20'>
			<CardWrap>
				{data.map((v, i) => (
					<Mini key={i}>
						<img src={v.img} alt='' />
						{v.name}
					</Mini>
				))}
			</CardWrap>
		</div>
	);
}
