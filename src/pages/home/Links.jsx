import { Menu } from './home.style';

export default function Links() {
	return (
		<div className='flex flex-col gap-8'>
			<Menu to='villager'>주민 명부</Menu>
			<Menu to='popularity'>인기 투표</Menu>
			<Menu to='board'>커뮤니티</Menu>
		</div>
	);
}
