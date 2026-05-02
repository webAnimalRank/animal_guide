import toast from 'react-hot-toast';
import { useFetchStore } from '../../store/useFetchStore';
import { Menu, Tab } from './home.style';
import { Url2 } from '../../components/style';
import { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';
import { Logout } from '../mypage/mypage.style';
import { replace, useNavigate } from 'react-router-dom';

const menus = [
  { link: 'villager', name: '주민 명부' },
  { link: 'popularity', name: '인기 투표' },
  { link: 'board', name: '커뮤니티' }
];

export function Links() {
  return (
    <nav className='ml-auto h-max p-3 rounded-xl flex flex-col gap-4 max-lg:hidden bg-(--cw)/60'>
      {menus.map((m) => (
        <Menu key={m.link} to={m.link}>
          {m.name}
        </Menu>
      ))}
    </nav>
  );
}

export function Links2({ menu, onClose }) {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const menuWrap = menuRef.current;

    if (menu && menuWrap) {
      disableBodyScroll(menuWrap, { reserveScrollBarGap: true });
    } else if (menuWrap) {
      enableBodyScroll(menuWrap);
    }

    return () => {
      if (menuWrap) {
        enableBodyScroll(menuWrap);
      }
    };
  }, [menu]);

  const { member, logout } = useFetchStore();
  const handleClick = () => {
    if (typeof onClose === 'function') onClose();
  };

  const handleLogout = async () => {
    navigate('/', { replace: true });
    const result = await logout();

    if (result.success) {
      toast.success('로그아웃되었습니다.');
      handleClick();
    } else {
      toast.error('로그아웃 실패');
    }
  };

  if (!menu) return null;

  return (
    <nav
      ref={menuRef}
      className='bg-(--c)/80 text-white/60 shadow-(--shadow) flex flex-col gap-5 items-center justify-center fixed inset-0 top-12 z-30 md:hidden backdrop-blur-xs'
    >
      {menus.map((m) => (
        <Menu key={m.link} to={m.link} onClick={handleClick}>
          {m.name}
        </Menu>
      ))}
      <div className='flex items-center gap-8 pt-5'>
        {member ? (
          <Logout onClick={handleLogout}>로그아웃</Logout>
        ) : (
          <>
            <Url2 to='login' className='login' onClick={handleClick}>
              로그인
            </Url2>
            <Url2 to='sign' className='sign' onClick={handleClick}>
              회원가입
            </Url2>
          </>
        )}
      </div>
    </nav>
  );
}
