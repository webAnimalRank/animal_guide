import { lazy } from 'react';

const lazyImport = (path) => lazy(() => import(`./pages/${path}`));

export const routes = [
	{ path: '/', component: lazyImport('home/Home.jsx'), layout: 'L' },
	{ path: 'villager', component: lazyImport('villager/Villager.jsx'), layout: 'L' },
	{ path: 'popularity', component: lazyImport('popularity/Popularity.jsx'), layout: 'L' },
	{ path: 'board', component: lazyImport('board/Board.jsx'), layout: 'L' },
	{ path: 'board/write', component: lazyImport('board/Write.jsx'), layout: 'L' },
	{ path: 'board/edit/:boardNo?', component: lazyImport('board/Write.jsx'), layout: 'L' },
	{ path: 'board/post/:boardNo?', component: lazyImport('board/Post.jsx'), layout: 'L' },
	{ path: 'mypage', component: lazyImport('mypage/MyPage.jsx'), layout: 'L' },
	{ path: 'login', component: lazyImport('login/Login.jsx'), layout: 'L0' },
	{ path: 'sign', component: lazyImport('sign/Sign.jsx'), layout: 'L0' }
];
