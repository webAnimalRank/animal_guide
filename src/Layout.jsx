import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Link } from 'react-router-dom';
import Logo from './assets/img/logo.png';
import { Box } from './components/style';
import { Login } from './components/login.style';
import ScrollTop from './components/ScrollTop';

export function L() {
	return (
		<>
			<ScrollTop />
			<Header />
			<div className='w-full min-h-screen flex flex-col items-center'>
				<Outlet />
				<footer className='bg-(--c)/80 w-full h-24 font-(family-name:--f) text-left text-sm flex justify-center items-center mt-auto'>
					<div className='w-7xl px-4 opacity-80 flex flex-col gap-2'>
						© 2026 랭킹동숲
						<div className='foot break-keep'>
							본 사이트는 비영리 목적의 포트폴리오용 토이 프로젝트이며, 사용된 모든 이미지 및 데이터의 저작권은 Nintendo
							및 원저작권자에게 있습니다.
							<br /> Data powered by Nookipedia API.
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}

export function L0() {
	return (
		<Login>
			<Link to='/'>
				<img className='w-80 max-md:w-60 max-sm:w-50' src={Logo} alt='' />
			</Link>

			<Outlet />
		</Login>
	);
}
