import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from './mypage.style';
import { getMyInfo } from '../member/memberApi';
import axios from 'axios';

export default function MyPost() {
	const [posts, setPosts] = useState([]);
	const [member, setMember] = useState(null);

	useEffect(() => {
		// 로그인된 유저 정보 가져오기
		getMyInfo()
			.then(res => {
				setMember(res.data);
				return axios.get(`http://localhost:8080/api/boards?search=writer&keyword=${res.data.memberNo}`, { withCredentials: true });
		})
		.then(res => {
			setPosts(res.data.items || []); // BoardPageResponse 구조에 맞춰 items 사용
		})
		.catch(() => {
			setPosts([]);
			setMember(null);
		});
	}, []);


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
					<button onClick={() => edit(post.boardNo)} className='hover:font-extrabold'>수정</button>
					<button onClick={() => remove(post.boardNo)} className='hover:font-extrabold'>삭제</button>
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
