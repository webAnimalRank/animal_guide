import styled from 'styled-components';

export const CardWrap = styled.div.attrs({
	className: 'h-full p-10 grid gap-2 bg-white/10'
})`
	grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  grid-auto-rows: min-content;
`;

export const Mini = styled.button.attrs({
	type: 'button',
	className: 'w-full pb-2 bg-(image:--glass2) shadow-(--shadow) rounded-2xl border-solid border-1 border-white/10 font-extrabold backdrop-blur-[2px]'
})`
	img {
		width: 100%;
	}
	transition: background-color 0.2s ease-out;
	&:hover {
		background-color: rgba(255, 255, 255, 0.4);
	}
`;
