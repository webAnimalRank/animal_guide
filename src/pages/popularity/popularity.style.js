import styled from 'styled-components';
import { CardWrap } from '../villager/villager.style';
import { Btn, Glass } from '../../components/style';

const base = '/animal_guide';

export const SelectWrap = styled(CardWrap).attrs({
	className: 'h-full p-4 pr-0 gap-2 rounded-2xl'
})`
	@media (max-width: 480px) {
		grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
		grid-auto-rows: 7rem;
		padding: 0.5rem;
		gap: 0.25rem;
	}
`;

export const SelectBox = styled.label.attrs({
	className:
		'pt-2 pb-1 px-7 rounded-xl w-full flex flex-col gap-3 relative cursor-pointer overflow-hidden font-extrabold whitespace-nowrap name bg-white/10'
})`
	@media (max-width: 480px) {
		gap: 0.3rem;
		padding-inline: 0;
		padding-block: 0.4rem 0.1rem;
		.name {
			font-size: 0.8rem;
		}
	}
	transition: background-color 0.2s ease-out;
	&:has(:disabled) {
		cursor: default;
	}
	&:has(:checked) {
		background-color: color-mix(in oklab, var(--p) 30%, transparent);
	}
	&:hover .txt {
		opacity: 1;
	}
	&:has(:disabled) .txt {
		background-color: var(--cw);
	}
`;

export const Txt = styled.div.attrs({
	className:
		'txt rounded-none absolute inset-x-0 bottom-0 py-2 flex items-center justify-center font-bold text-xl opacity-0 text-white text-shadow-(--shadow2) bg-(--c2)'
})`
	@media (max-width: 480px) {
		font-size: 0.9rem;
		padding-block: 0.3rem;
	}
	transition: opacity 0.1s ease-out;
`;

export const CheckWrap = styled.div.attrs({
	className: 'w-120 h-30 max-sm:w-full grid grid-cols-3 auto-rows-[100%] gap-5 pr-1.5'
})`
	@media (max-width: 480px) {
		height: 5.5rem;
		gap: 1rem;
	}
`;

export const CheckBox = styled(Glass).attrs({
	className: 'size-full pb-2 flex flex-col justify-center font-bold text-lg relative'
})`
	@media (max-width: 480px) {
		width: 100%;
		font-size: 0.9rem;
		padding-bottom: 0.25rem;
		&.empty {
			padding-top: 0.75rem;
			div {
				border-radius: 0.5rem;
			}
		}
	}
`;

export const Close = styled.button.attrs({
	type: 'button',
	className: 'absolute w-8 max-sm:w-7 aspect-square top-0 right-0 rounded-full'
})`
	transition: background-color 0.1s ease-out;
	background: var(--c2) url(${base}/close.svg) center / 80% no-repeat;
	translate: 40% -40%;
	&:hover {
		background-color: var(--cw);
	}
	@media (max-width: 480px) {
		width: 1.4rem;
	}
`;

export const Submit = styled(Btn).attrs({
	type: 'button',
	className: 'self-end max-sm:w-full text-lg'
})`
	&:disabled {
		pointer-events: none;
		opacity: 0.5;
	}
`;
