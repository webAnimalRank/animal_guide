import { Menu, Tab } from './home.style';

export function Links() {
	return (
		<div className='flex flex-col gap-8 max-lg:hidden'>
			<Menu to='villager'>주민 명부</Menu>
			<Menu to='popularity'>인기 투표</Menu>
			<Menu to='board'>커뮤니티</Menu>
		</div>
	);
}

export function Links2() {
	return (
		<div className='bg-(image:--glass) bg-(--bg) shadow-(--shadow) justify-between flex flex-col gap-3 w-max p-5 rounded-3xl fixed left-5 top-20 backdrop-blur-2xl'>
			<Tab to='villager'>주민 명부</Tab>
			<Tab to='popularity'>인기 투표</Tab>
			<Tab to='board'>커뮤니티</Tab>
		</div>
	);
}
