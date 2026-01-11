import Logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { Url } from './style';

export default function Header() {
	return (
		<header className='fixed inset-x-0 h-20 bg-(--header) shadow-(--shadowB) flex justify-center'>
			<div className='w-7xl h-full px-5 flex justify-between'>
				<nav className='w-max flex gap-5 items-center'>
					<Link to='/'>
						<img className='h-20' src={Logo} alt='' />
					</Link>
					<Url className='page' to='/'>
						주민 명부
					</Url>
					<Url className='page' to='/'>
						인기 투표
					</Url>
					<Url className='page' to='/'>
						커뮤니티
					</Url>
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
