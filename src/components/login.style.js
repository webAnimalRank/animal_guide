import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Field = styled.label.attrs({
	className: 'bg-white rounded-2xl p-4'
})`
	input {
		font-weight: 700;
		width: 100%;
	}
`;

export const Btn = styled.button.attrs({
	type: 'button',
	className: 'rounded-2xl bg-(--p) p-3 text-white font-extrabold text-xl mt-5'
})`
	transition: opacity 0.1s ease-out;
	&:hover {
		opacity: 0.8;
	}
`;

export const Btn2 = styled(Link).attrs({
	type: 'button',
	className: 'w-max self-center text-(--p) font-extrabold text-lg relative'
})`
	&::after {
		content: '';
		position: absolute;
		top: 100%;
		inset-inline: 0;
		height: 2px;
		background-color: var(--p);
		scale: 0 1;
		transition: scale 0.2s ease-out;
    transform-origin: left;
	}
	&:hover::after {
		scale: 1 1;
	}
`;
