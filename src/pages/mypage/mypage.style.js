import styled from 'styled-components';
import { Btn } from '../../components/style';
import { SelectBox, SelectWrap } from '../popularity/popularity.style';

export const Fold = styled.button.attrs({
	type: 'button',
	className: 'border-b-2 flex justify-between pb-1 text-2xl font-extrabold'
})`
	&::after {
		content: '';
		width: 0.8rem;
		aspect-ratio: 1;
		mask: url(/fold.svg) center / contain no-repeat;
		background-color: var(--p);
		translate: -1rem;
		transition: scale 0.2s ease-out;
	}
	&.fold::after {
		scale: 1 1;
	}
`;

export const Form = styled.form.attrs({
	className: 'flex flex-col gap-6 w-full p-2 font-bold max-sm:text-sm'
})``;

export const ImgIcon = styled.button.attrs({
	type: 'button',
	className:
		'w-40 max-md:w-25 rounded-full bg-white/20 p-4 max-md:p-2 hover:bg-white/30 transition-colors duration-300 ease-out'
})`
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

export const IconWrap = styled(SelectWrap).attrs({
	className: 'absolute z-40 p-2 top-50 max-md:top-30 bg-(--c2)'
})`
	height: 32rem;
	grid-auto-rows: max-content;
	@media (max-width: 480px) {
		padding: 0.25rem;
		grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
		height: 24rem;
	}
`;

export const Select = styled.button.attrs({
	type: 'button',
	className:
		'bg-white/20 rounded-2xl max-sm:rounded-xl flex justify-center p-2 hover:bg-white/30 transition-color duration-300 ease-out aspect-square'
})``;

export const EditList = styled.div.attrs({
	className: 'grid grid-cols-2 gap-4 flex-1'
})`
	@media (max-width: 480px) {
		grid-template-columns: 1fr;
	}
`;

export const Label = styled.label.attrs({
	className: 'w-full flex flex-col gap-2 items-start'
})``;

export const Edit = styled(Btn).attrs({
	type: 'submit',
	className: 'w-max self-end -translate-x-2 disabled:pointer-events-none disabled:opacity-50 text-white/80'
})``;

export const Tag = styled.span.attrs({
	className: 'bg-(--c)/80 text-white rounded-md text-xs py-1 px-2'
})``;

export const Action = styled.button.attrs({
	type: 'button',
	className: 'size-3 hover:opacity-70'
})`
	mask: url(/fold.svg) center / contain no-repeat;
	background-color: var(--p);
	&.prev {
		rotate: 90deg;
	}
	&.next {
		rotate: -90deg;
	}
	&:disabled {
		opacity: 0.3;
	}
`;

export const ResultBox = styled(SelectBox).attrs({
	as: 'div',
	className: 'h-50 max-sm:h-35 aspect-3/4 cursor-default!'
})``;

export const Logout = styled(Btn).attrs({
	className: 'mt-auto mx-auto flex items-center gap-1 bg-(--cw)/60 hover:bg-(--cw)/80!'
})`
	&::before {
		content: '';
		width: 1.2rem;
		aspect-ratio: 1;
		background: url(/logout.svg) center / contain no-repeat;
		opacity: 0.6;
	}
`;
