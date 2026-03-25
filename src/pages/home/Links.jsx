import { useFetchStore } from '../../store/useFetchStore';
import { Menu, Tab } from './home.style';

export function Links() {
  return (
    <nav className="ml-auto flex flex-col gap-8 max-lg:hidden">
      <Menu to="villager">주민 명부</Menu>
      <Menu to="popularity">인기 투표</Menu>
      <Menu to="board">커뮤니티</Menu>
    </nav>
  );
}

export function Links2({ onClose }) {
  const { member, logout } = useFetchStore();
  const handleClick = () => {
    if (typeof onClose === 'function') onClose();
  };

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      alert('로그아웃 성공');
      handleClick();
    } else {
      alert('로그아웃 실패');
    }
  };

  return (
    <nav className="bg-(--c2)/90 text-white/60 shadow-(--shadow) flex flex-col gap-5 items-center justify-center fixed inset-0 z-50 md:hidden backdrop-blur-sm">
      <Menu to="villager" onClick={handleClick}>
        주민 명부
      </Menu>
      <Menu to="popularity" onClick={handleClick}>
        인기 투표
      </Menu>
      <Menu to="board" onClick={handleClick}>
        커뮤니티
      </Menu>
      {member ? (
        <>
          <Tab to="mypage" onClick={handleClick}>
            마이페이지
          </Tab>
          <Tab as="button" onClick={handleLogout}>
            로그아웃
          </Tab>
        </>
      ) : (
        <>
          <Tab to="login" onClick={handleClick}>
            로그인
          </Tab>
          <Tab to="sign" onClick={handleClick}>
            회원가입
          </Tab>
        </>
      )}
    </nav>
  );
}
