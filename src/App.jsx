import { Route, Routes } from 'react-router-dom';
import './App.css';
import { L, L0 } from './Layout.jsx';
import { useEffect, useState } from 'react';
import { useFetchStore } from './store/useFetchStore.js';
import { useLoading } from './store/useLoading.js';
import LoadingScreen from './components/LoadingScreen.jsx';
import { routes } from './routes.js';
import { Toaster } from 'react-hot-toast';

function App() {
	const { fetchMe, fetchMembers, fetchVillagers, isAuthLoading } = useFetchStore();
	const isLoading = useLoading((state) => state.isLoading);

	const [firstLoad, setFirstLoad] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			await fetchMe();
			await fetchVillagers();
			await fetchMembers();
			setFirstLoad(false);
		};

		loadData();
	}, [fetchMe, fetchMembers, fetchVillagers]);

	if (isAuthLoading) {
		return <LoadingScreen isLoading={true} />;
	}

	return (
		<>
			<LoadingScreen isLoading={isLoading && firstLoad} />
			<Toaster
				toastOptions={{
					duration: 1500,
					style: {
						backgroundColor: 'var(--c2)',
						color: 'rgba(255, 255, 255, 0.6)'
					},
					success: {
						iconTheme: {
							primary: 'var(--p)'
						}
					},
					error: {
						iconTheme: {
							primary: 'indianred'
						}
					}
				}}
			/>
			<Routes>
				<Route path='/' element={<L />}>
					{routes
						.filter((r) => r.layout === 'L')
						.map((route) => {
							const Component = route.component;
							return <Route key={route.path} path={route.path} element={<Component />} />;
						})}
				</Route>
				<Route path='/' element={<L0 />}>
					{routes
						.filter((r) => r.layout === 'L0')
						.map((route) => {
							const Component = route.component;
							return <Route key={route.path} path={route.path} element={<Component />} />;
						})}
				</Route>
			</Routes>
		</>
	);
}

export default App;
