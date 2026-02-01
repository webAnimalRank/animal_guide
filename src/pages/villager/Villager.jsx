import { CardWrap, Mini, Wrap2 } from './villager.style';
import { char } from '../../temp-data/data';

export default function Villager() {
	return (
		<Wrap2>
			<CardWrap>
				{char.map((v, i) => (
					<Mini key={i}>
						<img src={v.mini} alt='' />
						{v.name}
					</Mini>
				))}
			</CardWrap>
		</Wrap2>
	);
}
