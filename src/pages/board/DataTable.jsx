import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table';
import { PageBtn } from './board.style';
import { Page } from '../../components/style';

const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor('id', { header: '번호', size: 5, cell: (info) => info.getValue() }),
	columnHelper.accessor('title', {
		header: '제목',
		size: 400,
		headerStyle: { textAlign: 'left' },
		cellStyle: { textAlign: 'left' },
		cell: (info) => info.getValue()
	}),
	columnHelper.accessor('writer', { header: '작성자', size: 5, cell: (info) => info.getValue() }),
	columnHelper.accessor('createdAt', { header: '작성일', size: 5, cell: (info) => info.getValue() })
];

export default function DataTable({ data }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: { pagination: { pageSize: 20 } }
	});

	const currentRows = table.getRowModel().rows;
	const paddedRows = currentRows.concat(Array(Math.max(0, 20 - currentRows.length)).fill(null));

	return (
		<div>
			<table className='w-full border-collapse'>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									style={{ width: header.getSize(), ...header.column.columnDef.headerStyle }}
									className='border-y-2 border-(--p) p-2 text-xs'
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{paddedRows.map((row, index) =>
						row ? (
							// 실제 데이터 행
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										style={cell.column.columnDef.cellStyle}
										className='border-y border-(--p) p-2 text-xs font-semibold'
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						) : (
							// 빈 행
							<tr key={`empty-${index}`}>
								<td
									colSpan={columns.length} // 모든 컬럼 합친 너비
									className='border-y border-(--p) p-2 text-xs'
								>
									아직 작성된 글이 없습니다
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>

			<div className='mt-4 flex items-center justify-center space-x-2'>
				<PageBtn onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					이전
				</PageBtn>
				<span className='px-2 font-bold text-sm'>
					{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
				</span>
				<PageBtn onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					다음
				</PageBtn>
			</div>
		</div>
	);
}
