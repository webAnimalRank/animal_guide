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
        <img className='w-80 max-md:w-60 max-sm:w-50' src={Logo} alt='' />
      </Link>

      <Outlet />
    </Login>
  );
}
