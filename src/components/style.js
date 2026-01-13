import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
20% { translate: 0 -5px; }
80% { translate: 0 5px; }
`;

export const Url = styled(Link).attrs({
	className: 'font-extrabold text-lg'
})`
	&.page {
		position: relative;
	}
	&.page::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--p);
		scale: 0 1;
		transition: scale 0.2s ease-out;
		transform-origin: left;
	}
	&.page:hover::after {
		scale: 1 1;
	}
	&.login {
		display: flex;
		gap: 4px;
		align-items: center;
	}
	&.login::after {
		content: '';
		width: 22px;
		aspect-ratio: 1;
		background: url('./login.svg') center / contain no-repeat;
	}
	&.login:hover::after {
		animation: ${move} 0.7s ease-out infinite;
	}
`;

export const Box = styled.div.attrs({
	className: 'rounded-3xl p-5 flex flex-col gap-4 bg-(image:--glass)'
})``;
