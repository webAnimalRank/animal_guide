import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Link } from 'react-router-dom';
import Logo from './assets/img/logo.png';
import { Box } from './components/style';

export function L() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

export function L0() {
	return (
		<div className='h-full flex flex-col items-center gap-20'>
			<Link to='/'>
				<img className='w-80' src={Logo} alt='' />
			</Link>

			<Box className='py-10 px-16 rounded-4xl flex flex-col gap-10'>
				<Outlet />
			</Box>
		</div>
	);
}
