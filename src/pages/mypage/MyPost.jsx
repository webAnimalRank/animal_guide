import { Link } from 'react-router-dom';
import { Tag } from './mypage.style';

export default function MyPost() {
	const edit = () => {
		console.log('수정');
	};
	const remove = () => {
		console.log('삭제');
	};

	const btns = [
		{ id: '수정', handle: edit },
		{ id: '삭제', handle: remove }
	];

	const test = [1, 2, 3];

	return (
		<div className='flex flex-col'>
			{test.map((v, i) => (
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
			))}
		</div>
	);
}
