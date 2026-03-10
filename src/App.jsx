import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home.jsx';
import Villager from './pages/villager/Villager.jsx';
import Popularity from './pages/popularity/Popularity.jsx';
import Board from './pages/board/Board.jsx';
import Write from './pages/board/Write.jsx';
import Post from './pages/board/Post.jsx';
import Login from './pages/login/Login.jsx';
import Sign from './pages/sign/Sign.jsx';
import MyPage from './pages/mypage/MyPage.jsx';
import { L, L0 } from './Layout.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;


function App() {
  const [member, setMember] = useState(null); // 전역 member 상태

  // 세션 기반 로그인 정보 가져오기
  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/me`)
      .then(res => setMember(res.data))
      .catch(() => setMember(null));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<L member={member} setMember={setMember} />}>
        <Route path="" element={<Home />} />
        <Route path="villager" element={<Villager />} />
        <Route path="popularity" element={<Popularity />} />
        <Route path="board" element={<Board />} />
        <Route path="board/Write" element={<Write />} />
        <Route path="board/post" element={<Post />} />
        <Route path="board/post/:boardNo" element={<Post />} />
        <Route path="mypage" element={<MyPage member={member} setMember={setMember} />} />
      </Route>
      <Route path="/" element={<L0 />}>
        <Route path="login" element={<Login setMember={setMember} />} />
        <Route path="sign" element={<Sign />} />
      </Route>
    </Routes>
  );
}

export default App;
