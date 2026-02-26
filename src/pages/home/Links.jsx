import { Menu, Tab } from './home.style';

export function Links() {
	return (
		<nav className='ml-auto flex flex-col gap-8 max-lg:hidden'>
			<Menu to='villager'>주민 명부</Menu>
			<Menu to='popularity'>인기 투표</Menu>
			<Menu to='board'>커뮤니티</Menu>
		</nav>
	);
}

export function Links2({ onClose }) {
	const handleClick = () => {
		if (typeof onClose === 'function') onClose();
	};

	return (
		<nav className='bg-(--c2) text-white/60 shadow-(--shadow) justify-between flex flex-col gap-3 fixed inset-10 z-50 md:hidden'>
			<Tab to='villager' onClick={handleClick}>
				주민 명부
			</Tab>
			<Tab to='popularity' onClick={handleClick}>
				인기 투표
			</Tab>
			<Tab to='board' onClick={handleClick}>
				커뮤니티
			</Tab>
			<Tab to='login' onClick={handleClick}>
				로그인
			</Tab>
			<Tab to='sign' onClick={handleClick}>
				회원가입
			</Tab>
		</nav>
	);
}
