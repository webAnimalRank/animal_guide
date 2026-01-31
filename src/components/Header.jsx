import Logo from '../assets/img/logo.png';
import { NavLink } from 'react-router-dom';
import { Url, Page, Menu, Head } from './style';
import { Links2 } from '../pages/home/Links';
import { useState } from 'react';

const links = [
	{ to: 'villager', label: '주민 명부' },
	{ to: 'popularity', label: '인기 투표' },
	{ to: 'board', label: '커뮤니티' }
];

export default function Header() {
	const [menu, setMenu] = useState(false);

	return (
		<Head>
			<div className='w-7xl h-full px-5 flex justify-between max-sm:justify-center items-center'>
				<Menu onClick={() => setMenu(!menu)} />
				<nav className='w-max flex gap-5 items-center'>
					<NavLink to='/'>
						<img className='h-20' src={Logo} alt='' />
					</NavLink>
					{links.map((link, index) => (
						<Page key={index} className={({ isActive }) => (isActive ? 'active' : '')} to={link.to}>
							{link.label}
						</Page>
					))}
				</nav>
				<nav className='w-max flex gap-5 items-center'>
					<Url className='login' to='/login'>
						로그인
					</Url>
					<Url className='sign' to='/sign'>
						회원가입
					</Url>
					{/* <Url to='/'>이름 님</Url>
					<Url to='/'>로그아웃</Url> */}
				</nav>
				{menu && <Links2 />}
			</div>
		</Head>
	);
}
