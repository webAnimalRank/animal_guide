import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from './mypage.style';
import { getMyInfo } from '../member/memberApi';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function MyPost() {
	const [posts, setPosts] = useState([]);
	const [member, setMember] = useState(null);

	useEffect(() => {
    // 내 로그인 정보 확인
    axios.get(`${API_URL}/api/members/me`)
        .then(res => console.log('회원 정보:', res.data))
        .catch(err => console.log('회원 정보 불러오기 실패', err));
}, []);


	useEffect(() => {
		getMyInfo()
			.then((res) => {
				setMember(res.data);

				return axios.get(`${API_URL}/api/boards/my`, {
					withCredentials: true
				});
			})
			.then((res) => {
				setPosts(res.data); // 그냥 배열
			})
			.catch(() => {
				setPosts([]);
				setMember(null);
			});
	}, []);;

	const edit = (boardNo) => {
		console.log('수정', boardNo);
	};

	const remove = (boardNo) => {
		console.log('삭제', boardNo);
	};

	if (!member) {
		return <div>회원 정보를 불러올 수 없습니다.</div>;
	}

	// const btns = [
	// 	{ id: '수정', handle: edit },
	// 	{ id: '삭제', handle: remove }
	// ];

	// const test = [1, 2, 3];

	return (
		<div className='flex flex-col'>
			{posts.length === 0 ? (
				<div>작성한 글이 없습니다.</div>
			) : (
				posts.map((post) => (
					<div key={post.boardNo} className='flex items-center gap-4 pr-2 border-b py-3 font-bold text-sm'>
						<Tag>{post.boardKind || '자유'}</Tag>
						<Link to={`/board/post/${post.boardNo}`} className='flex-1 text-left underline-offset-4 hover:underline'>
							{post.boardTitle}
						</Link>
						<button onClick={() => edit(post.boardNo)} className='hover:font-extrabold'>
							수정
						</button>
						<button onClick={() => remove(post.boardNo)} className='hover:font-extrabold'>
							삭제
						</button>
					</div>
				))
			)}

			{/* {test.map((v, i) => (
				<div key={i} className='flex items-center gap-4 pr-2 border-b py-3 font-bold text-sm'>
					<Tag>자유</Tag>
					<Link to='/board/post' className='flex-1 text-left underline-offset-4 hover:underline'>
						{v}
					</Link>
					{btns.map(({ id, handle }) => (
						<button key={id} type='button' onClick={handle} className='hover:font-extrabold'>
							{id}
						</button>
					))}
				</div>
			))} */}
		</div>
	);
}
