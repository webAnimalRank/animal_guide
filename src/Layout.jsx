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
			<Outlet />
		</>
	);
}

export function L0() {
	return (
		<Login>
			<Link to='/'>
				<img className='w-80' src={Logo} alt='' />
			</Link>

			<Box className='py-10 px-16 max-sm:px-10 rounded-4xl flex flex-col gap-10'>
				<Outlet />
			</Box>
		</Login>
	);
}
