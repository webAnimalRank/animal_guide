import { lazy } from 'react';

export const routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/home/Home.jsx')),
    layout: 'L'
  },
  {
    path: 'villager',
    component: lazy(() => import('./pages/villager/Villager.jsx')),
    layout: 'L'
  },
  {
    path: 'popularity',
    component: lazy(() => import('./pages/popularity/Popularity.jsx')),
    layout: 'L'
  },
  {
    path: 'board',
    component: lazy(() => import('./pages/board/Board.jsx')),
    layout: 'L'
  },
  {
    path: 'board/write',
    component: lazy(() => import('./pages/board/Write.jsx')),
    layout: 'L'
  },
  {
    path: 'board/edit/:boardNo',
    component: lazy(() => import('./pages/board/Write.jsx')),
    layout: 'L'
  },
  {
    path: 'board/post/:boardNo',
    component: lazy(() => import('./pages/board/Post.jsx')),
    layout: 'L'
  },
  {
    path: 'mypage',
    component: lazy(() => import('./pages/mypage/MyPage.jsx')),
    layout: 'L'
  },
  {
    path: 'login',
    component: lazy(() => import('./pages/login/Login.jsx')),
    layout: 'L0'
  },
  {
    path: 'sign',
    component: lazy(() => import('./pages/sign/Sign.jsx')),
    layout: 'L0'
  }
];
