import styled from 'styled-components';
import { CardWrap } from '../villager/villager.style';

const base = '/animal_guide';

export const SelectWrap = styled(CardWrap).attrs({
	className: 'h-full p-4 pr-0 overflow-y-scroll gap-2 rounded-2xl'
})`
	@media (max-width: 480px) {
		grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
		grid-auto-rows: 7rem;
		padding: 0.5rem;
		gap: 0.25rem;
	}
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
`;

export const SelectBox = styled.label.attrs({
	className:
		'pt-4 pb-2 px-7 w-full flex flex-col gap-3 bg-(image:--glass2) shadow-(--shadow) rounded-xl relative cursor-pointer overflow-hidden'
})`
	background-color: rgba(255, 255, 255, 0.3);
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
		background-color: yellowgreen;
	}
	&:has(:checked) .txt {
		background-color: var(--c);
	}
	&:hover .txt {
		opacity: 1;
	}
	&:has(:disabled) .txt {
		background-color: slategray;
	}
`;

export const Txt = styled.div.attrs({
	className:
		'txt bg-(image:--glass) shadow-(--shadow) absolute inset-x-0 bottom-0 py-2 flex items-center justify-center font-extrabold text-xl opacity-0 text-white text-shadow-(--shadow2)'
})`
	@media (max-width: 480px) {
		font-size: 0.9rem;
		padding-block: 0.25rem;
	}
	background-color: yellowgreen;
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

export const CheckBox = styled.div.attrs({
	className: 'size-full pb-2 flex flex-col bg-(image:--glass) shadow-(--shadow) rounded-2xl font-bold text-lg relative'
})`
	@media (max-width: 480px) {
		width: 100%;
		font-size: 0.9rem;
		padding-bottom: 0.25rem;
	}
`;

export const Close = styled.button.attrs({
	type: 'button',
	className: 'absolute w-8 max-sm:w-7 aspect-square top-0 right-0 rounded-full'
})`
	transition: background-color 0.1s ease-out;
	background: var(--c) url(${base}/close.svg) center / 80% no-repeat;
	translate: 40% -40%;
	&:hover {
		background-color: var(--text);
	}
	@media (max-width: 480px) {
		width: 1.4rem;
	}
`;

export const Submit = styled.button.attrs({
	type: 'button',
	className:
		'self-end h-max py-2 px-4 rounded-lg font-extrabold max-sm:w-full bg-(image:--glass2) shadow-(--shadow) text-white text-shadow-(--shadow2)'
})`
	background-color: yellowgreen;
	&:disabled {
		background: rgba(0, 0, 0, 0.3);
		pointer-events: none;
		box-shadow: initial;
	}
	transition: background-color 0.1s ease-out;
	&:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}
`;
