import { Line } from './board.style';

export default function Mobile({ table }) {
	return (
		<div className='w-full flex flex-col sm:hidden border-t-2 border-(--c)'>
			{table.getRowModel().rows.map((row) => (
				<Line to={`post/${row.original.id}`} key={row.id} className='w-full flex-col gap-2'>
					<span className='w-full text-sm text-left font-bold'>{row.original.title}</span>
					<div className='flex gap-2 text-xs self-end'>
						{row.original.writer} | {row.original.createdAt}
					</div>
				</Line>
			))}
		</div>
	);
}
