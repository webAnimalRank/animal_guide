import Logo from '../assets/img/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { Url, Page, Menu, Head, Icon } from './style';
import { Links2 } from '../pages/home/Links';
import { useRef, useState } from 'react';
import tom from '../assets/img/tom_icon.png';
import { useFetchStore } from '../store/useFetchStore';
import { useOutClick } from './useOutClick';
import toast from 'react-hot-toast';

const links = [
	{ to: 'villager', label: '주민 명부' },
	{ to: 'popularity', label: '인기 투표' },
	{ to: 'board', label: '커뮤니티' }
];

export default function Header() {
	const { member, logout } = useFetchStore();

	const [menu, setMenu] = useState(false);
	const [isIcon, setIsIcon] = useState(false);
	const navigate = useNavigate();

	const dropRef = useRef(null);

	useOutClick(dropRef, () => setIsIcon(false));

	const handleLogout = async () => {
		navigate('/', { replace: true });
		const result = await logout();

		if (result.success) {
			toast.success('로그아웃되었습니다.');
			setIsIcon(false);
		} else {
			toast.error('로그아웃 실패');
		}
	};

	return (
		<>
			<Head>
				<div className='w-7xl h-full px-5 flex justify-between max-md:justify-center items-center relative'>
					<Menu onClick={() => setMenu(!menu)} />
					<nav className='w-max h-full flex gap-5 items-center'>
						<NavLink className='h-10 max-sm:h-7' to='/'>
							<img className='h-full' src={Logo} alt='' />
						</NavLink>
						{links.map((link, index) => (
							<Page key={index} className={({ isActive }) => (isActive ? 'active' : '')} to={link.to}>
								{link.label}
							</Page>
						))}
					</nav>
					<nav ref={dropRef} className='w-max flex gap-5 items-center absolute right-5'>
						{member ? (
							<>
								<Icon onClick={() => setIsIcon(!isIcon)}>
									<img src={tom} className='' alt='' />
								</Icon>
								{isIcon && (
									<div className='absolute top-full right-0 translate-y-2 flex flex-col gap-2 w-max bg-(--c) p-4 rounded-lg border border-white/10'>
										<span className='text-(--p) font-bold pb-2 border-b border-white/30'>{member.memberName}</span>
										<Url to='/mypage' onClick={() => setIsIcon(false)}>
											마이페이지
										</Url>
										<Url as='button' onClick={handleLogout}>
											로그아웃
										</Url>
									</div>
								)}
							</>
						) : (
							<>
								<Url className='login' to='/login'>
									로그인
								</Url>
								<Url className='sign' to='/sign'>
									회원가입
								</Url>
							</>
						)}
					</nav>
				</div>
			</Head>
			{menu && <Links2 onClose={() => setMenu(false)} />}
		</>
	);
}
