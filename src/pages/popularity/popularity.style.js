import styled from 'styled-components';
import { CardWrap } from '../villager/villager.style';

const base = '/animal_guide';

export const SelectWrap = styled(CardWrap).attrs({
	className: 'h-full p-4 pr-0 overflow-y-scroll gap-2'
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
`;

export const SelectBox = styled.label.attrs({
	className:
		'pt-4 pb-2 px-7 w-full flex flex-col gap-3 bg-(image:--glass2) shadow-(--shadow) rounded-xl relative cursor-pointer overflow-hidden'
})`
	transition: background-color 0.2s ease-out;
	&:has(:disabled) {
		cursor: default;
	}
	&:has(:checked) {
		background-color: yellowgreen;
	}
	&:has(:checked) .txt {
		background-color: rgba(255, 255, 255, 0.8);
		color: yellowgreen;
		text-shadow: 0 0 8px white;
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
		'txt bg-(image:--glass) shadow-(--shadow) absolute inset-0 top-30 flex items-center justify-center font-extrabold text-xl opacity-0 text-white'
})`
	background-color: yellowgreen;
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
	transition: opacity 0.1s ease-out;
`;

export const CheckBox = styled.div.attrs({
	className:
		'w-35 h-full pb-2 flex flex-col bg-(image:--glass) shadow-(--shadow) rounded-2xl font-bold text-lg relative'
})`
	button {
		position: absolute;
		background: url(${base}/close.svg) center / 80% no-repeat;
		background-color: var(--text);
		width: 28px;
		aspect-ratio: 1;
		right: 0;
		top: 0;
		border-radius: 50%;
		translate: 40% -40%;
		transition: background-color 0.1s ease-out;
	}
	button:hover {
		background-color: #9d8a6e;
	}
`;

export const Submit = styled.button.attrs({
	type: 'button',
	className: 'bg-(image:--glass2) absolute right-10 bottom-10 py-2 px-4 rounded-lg shadow-(--shadow) font-bold'
})`
	transition: background-color 0.1s ease-out;
	&:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}
`;
