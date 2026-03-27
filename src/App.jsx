import { Route, Routes } from 'react-router-dom';
import './App.css';
import { L, L0 } from './Layout.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import { useFetchStore } from './store/useFetchStore.js';
import { useLoading } from './store/useLoading.js';
import LoadingScreen from './components/LoadingScreen.jsx';
import { routes } from './routes.js';

axios.defaults.withCredentials = true;

function App() {
  const { fetchMe, fetchVillagers, isAuthLoading } = useFetchStore();
  const isLoading = useLoading((state) => state.isLoading);

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin') === 'true';

    if (isLogin) {
      fetchMe(); // 로그인 정보
    } else {
      console.log(';;')
      useFetchStore.getState().setAuthLoading(false);
    }

    fetchVillagers(); // 주민 정보
  }, [fetchMe, fetchVillagers]);

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<L />}>
          {routes
            .filter((r) => r.layout === 'L')
            .map((route) => {
              const Component = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Component />}
                />
              );
            })}
        </Route>
        <Route path="/" element={<L0 />}>
          {routes
            .filter((r) => r.layout === 'L0')
            .map((route) => {
              const Component = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Component />}
                />
              );
            })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
