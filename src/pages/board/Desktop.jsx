import { flexRender } from "@tanstack/react-table";

export default function DeskTop({ table }) {
	return (
		<div className='w-full border-collapse hidden sm:flex flex-col'>
			{table.getHeaderGroups().map((headerGroup) => (
				<div key={headerGroup.id} className='border-y-2 border-(--text) flex py-2 text-xs font-semibold'>
					{headerGroup.headers.map((header) => (
						<div key={header.id} style={{ ...header.column.columnDef.headerStyle }}>
							{flexRender(header.column.columnDef.header, header.getContext())}
						</div>
					))}
				</div>
			))}
			{table.getRowModel().rows.map((row) => (
				<div key={row.id} className='py-2 flex text-xs font-semibold border-b border-(--text)'>
					<span className='w-12'>{row.original.id}</span>
					<span className='flex-1 text-left'>{row.original.title}</span>
					<span className='w-12'>{row.original.writer}</span>
					<span className='w-24'>{row.original.createdAt}</span>
				</div>
			))}

			{Array(Math.max(0, 20 - table.getRowModel().rows.length))
				.fill(0)
				.map((_, index) => (
					<div key={index} className='py-2 text-xs border-b border-(--text)'>
						아직 작성된 글이 없습니다.
					</div>
				))}
		</div>
	);
}
