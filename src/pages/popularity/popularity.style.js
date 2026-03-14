import styled, { keyframes } from 'styled-components';
import { CardWrap } from '../villager/villager.style';
import { Btn, Glass } from '../../components/style';

const fade = keyframes`
to { opacity: 1 }
`;

export const TipBox = styled.div.attrs({
	tabIndex: 0
})``;

export const Tip = styled.button.attrs({
	type: 'button',
	className: 'pr-6'
})`
	background: url(/tip.svg) right center / 20px no-repeat;
`;

export const Close = styled.button.attrs({
	type: 'button',
	className: 'w-full mt-2 text-xs border py-1 rounded-sm'
})`
	@media (min-width: 480px) {
		display: none;
	}
`;

export const TipText = styled.div.attrs({
	className:
		'absolute z-50 right-0 top-full p-2 bg-(--c) rounded-sm border-white/20 border max-sm:text-sm break-keep text-left max-sm:w-57 invisible opacity-0'
})`
	transition: opacity 0.2s ease-out;
	${TipBox}:hover & {
		visibility: visible;
		opacity: 1;
	}
	&:has(${Close}:active) {
		visibility: hidden;
	}
`;

export const SelectWrap = styled(CardWrap).attrs({
	className: 'h-full gap-2 rounded-2xl overflow-y-auto'
})`
	&::-webkit-scrollbar {
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 20px;
	}
	@media (max-width: 480px) {
		&::-webkit-scrollbar {
			display: none;
		}
		grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
		grid-auto-rows: 7rem;
		gap: 0.25rem;
	}
`;

export const SelectBox = styled.label.attrs({
	className:
		'p-2 pb-1 aspect-3/4 rounded-xl w-full flex flex-col gap-3 relative cursor-pointer overflow-hidden font-extrabold whitespace-nowrap name bg-white/10'
})`
	img {
		height: 100%;
		object-fit: contain;
		opacity: 0;
	}
	.load {
		animation: ${fade} 0.5s ease-out forwards;
	}
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

export const Cancel = styled.button.attrs({
	type: 'button',
	className: 'absolute w-8 max-sm:w-7 aspect-square top-0 right-0 rounded-full'
})`
	transition: background-color 0.1s ease-out;
	background: var(--c2) url(/close.svg) center / 80% no-repeat;
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
