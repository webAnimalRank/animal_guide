import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Btn } from '../../components/style';

export const TabWrap = styled.div.attrs({
	className: 'flex gap-6 w-max self-center'
})``;

export const TabBtn = styled.button.attrs({
	type: 'button',
	className: 'font-extrabold text-xl relative opacity-60'
})`
	&:hover {
		opacity: 0.8;
	}
	&.active {
		opacity: 1;
	}
`;

export const Line = styled(Link).attrs({
	className: 'border-b border-white/30 py-1 max-sm:px-1 flex-0 font-semibold flex items-center hover:bg-white/10'
})``;

export const Undo = styled(Link).attrs({
	to: '/board',
	className: 'font-semibold flex items-center gap-1 hover:opacity-70'
})`
	&::before {
		content: '';
		width: 1.5rem;
		aspect-ratio: 1;
		background: url(/undo.svg) center / contain no-repeat;
	}
`;

export const SearchBtn = styled(Btn).attrs({
	className: 'size-6 flex items-center justify-center'
})`
	mask: url(/search.svg) center / contain no-repeat;
	background-color: rgba(255, 255, 255, 0.6);
`;

export const WriteBtn = styled(Btn).attrs({
	className: 'flex gap-2 items-center bg-white/10 hover:bg-white/15'
})`
	&::before {
		content: '';
		height: 1rem;
		aspect-ratio: 1;
		mask: url(/pencil.svg) center / contain no-repeat;
		background-color: currentColor;
	}
`;
