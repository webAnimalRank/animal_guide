import { Link } from 'react-router-dom';
import styled from 'styled-components';

const base = '/animal_guide';

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

export const PageBtn = styled.button.attrs({
	type: 'button',
	className: 'text-sm font-bold relative rounded-md size-7'
})`
	background: center / contain no-repeat;

	&.active {
		background-color: rgba(255, 255, 255, 0.2);
	}
	&:is(.first, .prev) {
		scale: -1;
	}
	&:is(.next, .prev) {
		background-image: url(${base}/angle.svg);
	}
	&:is(.last, .first) {
		background-image: url(${base}/angle2.svg);
	}
	&:disabled:not(.active) {
		opacity: 0.5;
	}
	&:disabled:hover {
		cursor: default;
	}
	&:not(:disabled):hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`;

export const Line = styled(Link).attrs({
	className: 'border-b border-(--c) py-1 flex-0 font-semibold flex items-center hover:bg-white/20'
})``;

export const Undo = styled(Link).attrs({
	to: '/board',
	className: 'font-semibold flex items-center gap-1 hover:opacity-70'
})`
	&::before {
		content: '';
		width: 1.5rem;
		aspect-ratio: 1;
		background: url(${base}/undo.svg) center / contain no-repeat;
	}
`;
