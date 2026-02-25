import styled, { keyframes } from 'styled-components';
import { Glass, Loading, Scroll } from '../../components/style';

const base = '/animal_guide';

export const CardWrap = styled(Scroll).attrs({
	className: 'w-full grid gap-2 p-1'
})`
	grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
	grid-auto-rows: min-content;
`;

export const Mini = styled(Glass).attrs({
	as: 'button',
	type: 'button',
	className: 'w-full pb-2 font-extrabold'
})`
	img {
		width: 100%;
	}
	transition: background-color 0.2s ease-out;
	&:hover {
		background-color: rgba(255, 255, 255, 0.4);
	}
`;

const fade = keyframes`
to { opacity: 1 }
`;

export const Card = styled.div.attrs({
	className:
		'flex flex-col h-90 p-10 max-sm:p-6 rounded-4xl flex-row gap-8 max-sm:gap-5 backdrop-blur-xl font-bold opacity-0 max-md:h-auto max-md:w-120 max-md:flex-col max-sm:w-100 font-(family-name:--f) bg-(--c)/60 shadow-(--shadow) text-white/80'
})`
	animation: ${fade} 0.2s ease-out forwards;
	@media (max-width: 480px) {
		width: 20rem;
		padding: 1rem 1.4rem;
	}
`;

export const Load = styled(Loading).attrs({
	className: 'absolute w-24 top-[50%] -translate-y-1/2 max-md:w-20 max-sm:w-16'
})``;

export const List = styled.div.attrs({
	className: 'text-base max-sm:text-sm flex gap-2 text-shadow-(--shadow) whitespace-nowrap'
})`
	&::before {
		content: '';
		width: 1rem;
		aspect-ratio: 1;
		background: url(${base}/link2.svg) center / contain no-repeat;
	}
	@media (max-width: 480px) {
		font-size: 0.8rem;
		padding-right: 0.75rem;
	}
`;

export const Close = styled.button.attrs({
	type: 'button',
	className: 'text-sm font-bold opacity-0 outline-none text-white text-shadow-(--shadow)'
})`
	transition: background-color 0.1s ease-out;
	animation: ${fade} 0.2s ease-out forwards;
`;

export const Nav = styled.nav.attrs({
	className: 'sticky top-26 flex items-center justify-between z-10 px-1'
})``;

export const SelectWrap = styled.div.attrs({
	className:
		'flex gap-4 max-sm:gap-3 font-bold ml-auto max-sm:absolute top-full right-1 max-sm:flex-col max-sm:translate-y-2 backdrop-blur-3xl bg-(--c)/50 shadow-(--shadow) rounded-lg px-4 max-sm:px-3 py-2'
})``;

export const Select = styled.select.attrs({
	className: 'appearance-none cursor-pointer border-b pr-5 text-white font-medium'
})`
	background: url(${base}/fold_w.svg) right / 0.6rem no-repeat;
`;

export const Search = styled.input.attrs({
	type: 'search',
	className:
		'outline-none text-(--c) font-bold w-50 py-2 px-4 rounded-full backdrop-blur-3xl bg-white/80 shadow-(--shadow)'
})``;

export const Filter = styled.button.attrs({
	type: 'button',
	className:
		'w-10 rounded-full aspect-square sm:hidden flex items-center justify-center backdrop-blur-3xl bg-(--c)/50 shadow-(--shadow)'
})`
	&::after {
		content: '';
		width: 70%;
		aspect-ratio: 1;
		background: url(${base}/filter.svg) center / contain no-repeat;
	}
`;
