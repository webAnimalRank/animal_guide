import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Home from './pages/home/Home.jsx';
import Popularity from './pages/popularity/Popularity.jsx';
import Board from './pages/board/Board.jsx';
import Villager from './pages/villager/Villager.jsx';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='' element={<Home />} />
				<Route path='villager' element={<Villager />} />
				<Route path='popularity' element={<Popularity />} />
				<Route path='board' element={<Board />} />
			</Routes>
		</>
	);
}

export default App;
