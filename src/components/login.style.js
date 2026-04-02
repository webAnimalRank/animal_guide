import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Login = styled.div.attrs({
	className: 'fixed inset-0 flex flex-col items-center gap-20 pt-20'
})`
	@media (max-width: 480px) {
		padding-top: 3rem;
		gap: 3rem;
	}
`;

export const Form = styled.form.attrs({
	className: 'flex flex-col w-80 gap-4'
})`
	@media (max-width: 480px) {
		width: 15rem;
		gap: 0.75rem;
	}
`;

export const Field = styled.label.attrs({
	className: 'bg-white/20 rounded-xl px-4 py-3'
})`
	input {
		font-family: Pretendard;
		font-weight: 700;
		width: 100%;
	}
	@media (max-width: 480px) {
		padding-block: 0.5rem;
	}
`;

export const Btn = styled.button.attrs({
	type: 'submit',
	className: 'rounded-xl bg-(--c) p-3 text-white font-bold text-xl max-sm:text-base mt-5'
})`
	transition: background-color 0.1s ease-out;
	&:hover {
		background-color: var(--p);
	}
`;

export const Btn2 = styled(Link).attrs({
	className: 'w-max self-center font-bold text-lg max-sm:text-sm max-sm:mt-2 relative'
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
