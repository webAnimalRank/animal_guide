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
import { useEffect } from 'react';
import { useFetchStore } from './store/useFetchStore.js';

axios.defaults.withCredentials = true;

function App() {
  const { fetchMe, fetchVillagers } = useFetchStore();

  useEffect(() => {
    fetchMe(); // 로그인 정보
    fetchVillagers(); // 주민 정보
  }, [fetchMe]);

  return (
    <Routes>
      <Route path="/" element={<L />}>
        <Route path="" element={<Home />} />
        <Route path="villager" element={<Villager />} />
        <Route path="popularity" element={<Popularity />} />
        <Route path="board" element={<Board />} />
        <Route path="board/write" element={<Write />} />
        <Route path="board/post" element={<Post />} />
        <Route path="board/post/:boardNo" element={<Post />} />
        <Route path="mypage" element={<MyPage />} />
      </Route>
      <Route path="/" element={<L0 />}>
        <Route path="login" element={<Login />} />
        <Route path="sign" element={<Sign />} />
      </Route>
    </Routes>
  );
}

export default App;
