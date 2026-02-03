import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const base = '/animal_guide';

const move = keyframes`
20% { translate: 0 -5px; }
80% { translate: 0 5px; }
`;

export const Head = styled.header.attrs({
	className: 'z-50 fixed inset-x-0 h-20 flex justify-center pb-1'
})`
	filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
	background: url('${base}/header.svg') bottom / contain repeat-x;
`;

export const Menu = styled.button.attrs({
	type: 'button',
	className: 'size-10 absolute left-5 z-30 rounded-full shadow-(--shadow) md:hidden'
})`
	mask: url('${base}/menu.svg') center / 70% no-repeat;
	background-color: var(--p);
`;

export const Url = styled(NavLink).attrs({
	className: 'font-bold text-lg text-white/80 max-md:hidden'
})`
	&.login {
		display: flex;
		gap: 4px;
		align-items: center;
	}
	&.login::after {
		content: '';
		width: 22px;
		aspect-ratio: 1;
		mask: url('${base}/login.svg') center / contain no-repeat;
		background-color: var(--p);
	}
	&.login:hover::after {
		animation: ${move} 0.7s ease-out infinite;
	}
	&:hover:not(.page) {
		font-weight: 900;
	}
	@media (max-width: 48rem) {
		&.login {
			display: none;
		}
	}
`;

export const Page = styled(Url).attrs({
	className: 'page relative'
})`
	&::after {
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
	&:hover::after {
		scale: 1 1;
	}
	&.active {
		font-weight: 900;
	}
	&.active::after {
		scale: 1 1;
	}
`;

export const Glass = styled.div.attrs({
	className: 'bg-(image:--glass2) shadow-(--shadow) rounded-2xl border-solid border-1 border-white/10'
})``;

export const Scroll = styled.div.attrs({
	className: 'overflow-y-auto'
})`
	&::-webkit-scrollbar {
		width: 1.4rem;
		background-color: transparent;
		border-radius: 20px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 2rem;
		border: 0.6rem solid transparent;
		background-clip: padding-box;
	}

	@media (max-width: 480px) {
		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

export const Box = styled.div.attrs({
	className: 'rounded-3xl p-5 flex flex-col gap-4 bg-(image:--glass) backdrop-blur-[3px]'
})``;

export const Wrap = styled.div.attrs({
	className:
		'max-w-7xl w-full min-h-0 flex-1 self-center p-6 pt-26 max-sm:p-4 max-sm:pt-26 bg-white/15 backdrop-blur-[3px] flex flex-col gap-5 overflow-hidden'
})``;

export const Login = styled.div.attrs({
	className: 'h-full flex flex-col items-center gap-20 pt-20'
})`
	@media (max-width: 480px) {
		padding-top: 3rem;
		gap: 2.5rem;
	}
`;
