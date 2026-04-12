import toast from 'react-hot-toast';
import { useFetchStore } from '../../store/useFetchStore';
import { Menu, Tab } from './home.style';
import { Url2 } from '../../components/style';

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
	const { member, logout } = useFetchStore();
	const handleClick = () => {
		if (typeof onClose === 'function') onClose();
	};

	const handleLogout = async () => {
		const result = await logout();

		if (result.success) {
			toast.success('로그아웃되었습니다.');
			handleClick();
		} else {
			toast.error('로그아웃 실패');
		}
	};

	return (
		<nav className='bg-(--c)/90 text-white/60 shadow-(--shadow) flex flex-col gap-5 items-center justify-center fixed inset-0 top-12 z-30 md:hidden backdrop-blur-sm'>
			<Menu to='villager' onClick={handleClick}>
				주민 명부
			</Menu>
			<Menu to='popularity' onClick={handleClick}>
				인기 투표
			</Menu>
			<Menu to='board' onClick={handleClick}>
				커뮤니티
			</Menu>
			<div className='flex items-center gap-8 pt-5'>
				{member ? (
					<>
						<Tab to='mypage' onClick={handleClick}>
							마이페이지
						</Tab>
						<Tab as='button' onClick={handleLogout}>
							로그아웃
						</Tab>
					</>
				) : (
					<>
						<Url2 to='login' className='login' onClick={handleClick}>
							로그인
						</Url2>
						<Url2 to='sign' className='sign' onClick={handleClick}>
							회원가입
						</Url2>
					</>
				)}
			</div>
		</nav>
	);
}
