import Logo from '../assets/img/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { Url, Page, Menu, Head } from './style';
import { Links2 } from '../pages/home/Links';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const links = [
	{ to: 'villager', label: '주민 명부' },
	{ to: 'popularity', label: '인기 투표' },
	{ to: 'board', label: '커뮤니티' }
];

export default function Header() {
	const [menu, setMenu] = useState(false);
	const [member, setMember] = useState(null); // 로그인 정보
	const navigate = useNavigate(); //useNavigate 추가로 import됨

	// 세션 체크
	useEffect(() => {
		axios
			.get(`${API_URL}/api/members/me`)
			.then((res) => setMember(res.data))
			.catch(() => setMember(null)); // 로그인 안 됨
	}, []);

	const handleLogout = () => {
		axios
			.post(`${API_URL}/api/members/logout`) // 로그아웃 API
			.then(() => {
				setMember(null);
				alert('로그아웃 되었습니다.');
				navigate('/'); // 홈으로 이동
			})
			.catch((err) => {
				console.error('로그아웃 실패', err);
				alert('로그아웃 실패');
			});
	};

	return (
		<>
			<Head>
				<div className='w-7xl h-full px-5 flex justify-between max-md:justify-center items-center'>
					<Menu onClick={() => setMenu(!menu)} />
					<nav className='w-max h-full flex gap-5 items-center'>
						<NavLink className='h-full py-4 pr-4' to='/'>
							<img className='h-full' src={Logo} alt='' />
						</NavLink>
						{links.map((link, index) => (
							<Page key={index} className={({ isActive }) => (isActive ? 'active' : '')} to={link.to}>
								{link.label}
							</Page>
						))}
					</nav>
					<nav className='w-max flex gap-5 items-center'>
						{member ? (
							<>
								<Url>{member.memberName} 님 환영합니다.</Url>
								<Url to='/mypage'>마이페이지</Url>
								<Url as='button' onClick={handleLogout}>
									로그아웃
								</Url>
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
