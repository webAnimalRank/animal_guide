import { flexRender } from '@tanstack/react-table';
import { Line } from './board.style';

export default function DeskTop({ table }) {
	const cols = [
		{ key: 'id', className: 'w-12' },
		{ key: 'title', className: 'flex-1 text-left' },
		{ key: 'writer', className: 'w-12' },
		{ key: 'createdAt', className: 'w-24' }
	];

	return (
		<div className='w-full border-collapse hidden sm:flex flex-col'>
			{table.getHeaderGroups().map((headerGroup) => (
				<div key={headerGroup.id} className='border-y-2 border-(--c) flex py-2 text-xs font-bold'>
					{headerGroup.headers.map((header) => (
						<div key={header.id} style={{ ...header.column.columnDef.headerStyle }}>
							{flexRender(header.column.columnDef.header, header.getContext())}
						</div>
					))}
				</div>
			))}
			{table.getRowModel().rows.map((row) => (
				<Line to='post' key={row.id} className='py-2 text-xs'>
					{cols.map((col) => (
						<span key={col.key} className={col.className}>
							{row.original[col.key]}
						</span>
					))}
				</Line>
			))}
		</div>
	);
}
