import { flexRender } from '@tanstack/react-table';
import { Line } from './board.style';

export default function DeskTop({ table, load }) {
	const cols = [
		{ key: 'id', className: 'w-12' },
		{ key: 'title', className: 'flex-1 text-left' },
		{ key: 'writer', className: 'w-20' },
		{ key: 'createdAt', className: 'w-24' }
	];

	return (
		<div className='w-full hidden sm:flex flex-col font-(family-name:--f)'>
			{table.getHeaderGroups().map((headerGroup) => (
				<div key={headerGroup.id} className='border-y-2 border-white/30 flex py-2 text-xs font-bold'>
					{headerGroup.headers.map((header) => (
						<div key={header.id} style={{ ...header.column.columnDef.headerStyle }}>
							{flexRender(header.column.columnDef.header, header.getContext())}
						</div>
					))}
				</div>
			))}
			{table.getRowModel().rows.map((row) => (
				<Line
					to={`post/${row.original.id}`}
					state={{ boardKind: table.options.meta.kind }}
					key={row.id}
					className={`py-2 text-xs ${!load ? 'load' : ''}`}
				>
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
