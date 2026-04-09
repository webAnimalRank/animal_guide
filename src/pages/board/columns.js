import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const columns = [
	columnHelper.accessor('id', {
		header: '번호',
		headerStyle: { width: '3rem' },
		cellStyle: { width: '3rem' },
		cell: (info) => info.getValue()
	}),
	columnHelper.accessor('title', {
		header: '제목',
		headerStyle: { textAlign: 'left', flex: 1 },
		cellStyle: { textAlign: 'left', flex: 1 },
		cell: (info) => info.getValue()
	}),
	columnHelper.accessor('writer', {
		header: '작성자',
		headerStyle: { width: '5rem' },
		cellStyle: { width: '5rem' },
		cell: (info) => info.getValue()
	}),
	columnHelper.accessor('createdAt', {
		header: '작성일',
		headerStyle: { width: '6rem' },
		cellStyle: { width: '6rem' },
		cell: (info) => info.getValue()
	})
];
