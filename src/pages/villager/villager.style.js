import styled, { keyframes } from 'styled-components';
import { Btn, Loading } from '../../components/style';

export const CardWrap = styled.div.attrs({
	className: 'w-full grid gap-2 p-1'
})`
	grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
	grid-auto-rows: min-content;
`;

const fade = keyframes`
to { opacity: 1 }
`;

const scale = keyframes`
from { scale: 0; opacity: 0; }
`;

export const Mini = styled.button.attrs({
	type: 'button',
	className: 'w-full p-1 font-extrabold border border-white/20 rounded-md text-white/60 hover:bg-(--p)/30 relative backdrop-blur-xs'
})`
	img {
		opacity: 0;
	}
	.load {
		animation: ${fade} 0.5s ease-out forwards;
	}
	transition: background-color 0.2s ease-out;
	&.birth::after {
		content: '';
		width: 1.2rem;
		aspect-ratio: 1;
		position: absolute;
		top: 2px;
		left: 2px;
		background: url(/cake.svg) center / contain no-repeat;
	}
`;

export const Card = styled.div.attrs({
	className:
		'flex flex-col h-90 p-10 max-sm:p-6 rounded-4xl flex-row gap-8 max-sm:gap-5 backdrop-blur-xl font-bold max-md:h-auto max-md:w-120 max-md:flex-col max-sm:w-100 font-(family-name:--f) bg-(--c)/60 shadow-(--shadowW) text-white/80'
})`
	animation: ${scale} 0.3s ease-out;
	@media (max-width: 480px) {
		width: 20rem;
		padding: 1rem 1.4rem;
	}
`;

export const Load = styled(Loading).attrs({
	className: 'absolute w-24 top-[50%] -translate-y-1/2 max-md:w-20 max-sm:w-16'
})``;

export const List = styled.div.attrs({
	className: 'text-base max-sm:text-sm flex gap-2 text-shadow-(--shadow)'
})`
	&::before {
		content: '';
		width: 1rem;
		aspect-ratio: 1;
		background: url(/link2.svg) center / contain no-repeat;
	}
	@media (max-width: 480px) {
		font-size: 0.8rem;
	}
`;

export const Close = styled(Btn).attrs({
	className: 'text-sm outline-none self-center! text-white/60 border-2 border-white/20 backdrop-blur-lg'
})`
	animation: ${scale} 0.3s ease-out;
`;

export const Nav = styled.nav.attrs({
	className: 'sticky top-23 max-sm:top-17 flex items-center justify-between z-10 px-1'
})``;

export const SelectWrap = styled.div.attrs({
	className: 'flex gap-4 font-bold ml-auto top-full right-1 border border-white/20 bg-(--cw) shadow-(--shadow) rounded-lg px-4 py-2 backdrop-blur-sm'
})`
	@media (max-width: 880px) {
		&.hide {
			display: none;
		}
		position: absolute;
		gap: 0.75rem;
		translate: 0 0.5rem;
		flex-direction: column;
		padding-inline: 0.75rem;
	}
`;

export const Select = styled.select.attrs({
	className: 'appearance-none cursor-pointer border-b pr-5 font-medium'
})`
	background: url(/fold_w.svg) right / 10px no-repeat;
`;

export const Filter = styled.button.attrs({
	type: 'button',
	className:
		'w-10 rounded-full aspect-square flex items-center justify-center border border-white/20 bg-(--cw) shadow-(--shadow) hover:bg-(--cw) transition-color duration-200 ease-out'
})`
	&::after {
		content: '';
		width: 70%;
		aspect-ratio: 1;
		background: url(/filter.svg) center / contain no-repeat;
	}
	@media (min-width: 880px) {
		display: none;
	}
`;

export const Reset = styled.button.attrs({
	type: 'button',
	className: 'flex gap-1 items-center justify-center'
})`
	&::before {
		content: '';
		width: 1rem;
		aspect-ratio: 1;
		background-color: rgba(255, 255, 255, 0.6);
		mask: url(/reset.svg) center / contain no-repeat;
	}
`;
