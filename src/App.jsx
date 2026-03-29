import { Route, Routes } from 'react-router-dom';
import './App.css';
import { L, L0 } from './Layout.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFetchStore } from './store/useFetchStore.js';
import { useLoading } from './store/useLoading.js';
import LoadingScreen from './components/LoadingScreen.jsx';
import { routes } from './routes.js';

axios.defaults.withCredentials = true;

function App() {
  const { fetchMe, fetchVillagers, isAuthLoading } = useFetchStore();
  const isLoading = useLoading((state) => state.isLoading);

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin') === 'true';

    const loadData = async () => {
      if (isLogin) {
        await fetchMe(); // 로그인 정보
      } else {
        useFetchStore.getState().setAuthLoading(false);
      }
      await fetchVillagers(); // 주민 정보

      setFirstLoad(false);
    };

    loadData();
  }, [fetchMe, fetchVillagers]);

  if (isAuthLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  return (
    <>
      <LoadingScreen isLoading={isLoading || firstLoad} />
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
