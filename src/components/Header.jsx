import Logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { Url } from './style';

const links = [
	{ to: '/villager', label: '주민 명부' },
	{ to: '/popularity', label: '인기 투표' },
	{ to: '/board', label: '커뮤니티' }
];

export default function Header() {
	return (
		<header className='fixed inset-x-0 h-20 bg-(image:--header) shadow-(--shadowB) flex justify-center'>
			<div className='w-7xl h-full px-5 flex justify-between'>
				<nav className='w-max flex gap-5 items-center'>
					<Link to='/animal_guide'>
						<img className='h-20' src={Logo} alt='' />
					</Link>
					{links.map((link, index) => (
						<Url key={index} className='page' to={link.to}>
							{link.label}
						</Url>
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
