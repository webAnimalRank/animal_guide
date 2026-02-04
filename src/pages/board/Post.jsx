import { Link } from 'react-router-dom';
import { Wrap } from '../../components/style';
import { Undo } from './board.style';

export default function Post() {
	return (
		<Wrap className='font-(family-name:--f)'>
			<div className='flex font-medium'>
				<Undo>목록</Undo>
			</div>
			<h3 className='bg-white/20 rounded-md py-2 px-4 text-left font-semibold'>제목</h3>
			<div className='flex justify-between border-b pb-2 px-4 font-medium'>
				<span>작성자</span>
				<span>시간</span>
			</div>

			<div className='bg-white/20 rounded-2xl min-h-0 flex-1 p-4 text-left'>내용</div>
		</Wrap>
	);
}
