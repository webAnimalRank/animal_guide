import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home.jsx';
import Popularity from './pages/popularity/Popularity.jsx';
import Board from './pages/board/Board.jsx';
import Villager from './pages/villager/Villager.jsx';
import Login from './pages/login/Login.jsx';
import Sign from './pages/sign/sign.jsx';
import { L, L0 } from './Layout.jsx';

function App() {
	return (
		<Routes>
			<Route path='/' element={<L />}>
				<Route path='' element={<Home />} />
				<Route path='villager' element={<Villager />} />
				<Route path='popularity' element={<Popularity />} />
				<Route path='board' element={<Board />} />
			</Route>
			<Route path='/' element={<L0 />}>
				<Route path='login' element={<Login />} />
				<Route path='sign' element={<Sign />} />
			</Route>
		</Routes>
	);
}

export default App;
