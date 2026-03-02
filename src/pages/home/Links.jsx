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
		<nav className='bg-(--c2)/90 text-white/60 shadow-(--shadow) flex flex-col gap-5 items-center justify-center fixed inset-0 z-50 md:hidden'>
			<Menu to='villager' onClick={handleClick}>
				주민 명부
			</Menu>
			<Menu to='popularity' onClick={handleClick}>
				인기 투표
			</Menu>
			<Menu to='board' onClick={handleClick}>
				커뮤니티
			</Menu>
			<Tab to='login' onClick={handleClick}>
				로그인
			</Tab>
			<Tab to='sign' onClick={handleClick}>
				회원가입
			</Tab>
		</nav>
	);
}
