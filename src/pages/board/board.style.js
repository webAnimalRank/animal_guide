import styled from 'styled-components';

export const TabWrap = styled.div.attrs({
	className: 'flex gap-2 bg-(image:--glass) w-max p-1.5 rounded-full shadow-(--shadow) self-center'
})``;

export const TabBtn = styled.button.attrs({
	type: 'button',
	className: 'rounded-full px-3 h-10 font-extrabold text-xl opacity-70'
})`
	&.active {
		border: 1px solid rgba(255, 255, 255, 0.3);
		background: var(--glass2);
		box-shadow: var(--shadow);
		opacity: 1;
	}
	&:hover {
		opacity: 1;
	}
`;

export const PageBtn = styled.button.attrs({
	type: 'button',
	className: 'text-sm px-3 py-1 bg-(image:--glass) font-bold rounded-full disabled:text-gray-400 shadow-(--shadow)'
})`
	transition: background-color 0.1s ease-out;

	&:hover:not(:disabled) {
		background-color: rgba(255, 255, 255, 0.2);
	}
`;
