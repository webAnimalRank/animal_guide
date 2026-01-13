import Logo from '../assets/img/logo.png';
import { NavLink } from 'react-router-dom';
import { Url, Page } from './style';

const links = [
	{ to: 'villager', label: '주민 명부' },
	{ to: 'popularity', label: '인기 투표' },
	{ to: 'board', label: '커뮤니티' }
];

export default function Header() {
	return (
		<header className='fixed inset-x-0 h-20 bg-(image:--header) shadow-(--shadowB) flex justify-center'>
			<div className='w-7xl h-full px-5 flex justify-between'>
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
					<Url className='login' to='/'>
						로그인
					</Url>
					<Url to='/'>회원가입</Url>
				</nav>
			</div>
		</header>
	);
}
