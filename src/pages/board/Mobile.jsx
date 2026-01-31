import { MLine } from './board.style';

export default function Mobile({ table, pageSize = 15 }) {
	return (
		<div className='w-full flex flex-col sm:hidden border-t-2 border-(--text)'>
			{table.getRowModel().rows.map((row) => (
				<MLine key={row.id}>
					<div className='w-full flex flex-col'>
						<span className='text-left'>{row.original.title}</span>
						<div className='flex gap-2 text-xs self-end'>
							{row.original.writer} | {row.original.createdAt}
						</div>
					</div>
				</MLine>
			))}

			{Array(Math.max(0, pageSize - table.getRowModel().rows.length))
				.fill(0)
				.map((_, index) => (
					<MLine key={`empty-${index}`}>
						<span className='font-medium'>아직 작성된 글이 없습니다.</span>
					</MLine>
				))}
		</div>
	);
}
