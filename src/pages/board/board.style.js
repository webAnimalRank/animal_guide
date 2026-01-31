import styled from 'styled-components';

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
	className: 'text-sm font-bold disabled:opacity-50 relative'
})`
	&:disabled:hover {
		cursor: default;
	}
	&::after {
		content: '';
		position: absolute;
		top: 100%;
		inset-inline: 0;
		height: 1px;
		background: var(--p);
		scale: 0 1;
		transition: scale 0.2s ease-out;
		transform-origin: left;
	}
	&:not(:disabled):hover::after {
		scale: 1 1;
	}
`;

export const MLine = styled.div.attrs({
	className: 'border-b border-(--text) h-12 font-semibold flex items-center'
})`
	span {
		font-size: var(--text-sm);
	}
`;
