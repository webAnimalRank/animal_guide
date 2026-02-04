import { Link } from 'react-router-dom';
import { Scroll } from '../../components/style';
import { MLine } from './board.style';

export default function Mobile({ table }) {
	return (
		<Scroll className='w-full flex flex-col sm:hidden border-y-2 border-(--c)'>
			{table.getRowModel().rows.map((row) => (
				<MLine key={row.id}>
					<Link to='post' className='w-full flex flex-col gap-2'>
						<span className='text-left font-bold'>{row.original.title}</span>
						<div className='flex gap-2 text-xs self-end'>
							{row.original.writer} | {row.original.createdAt}
						</div>
					</Link>
				</MLine>
			))}
		</Scroll>
	);
}
