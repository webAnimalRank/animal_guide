import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Title3 = styled.h3.attrs({
	className: 'font-extrabold text-3xl flex items-center gap-2 border-b-2 border-solid pb-2'
})`
	&::before {
		content: '';
		width: 32px;
		aspect-ratio: 1;
		background: center / contain no-repeat;
	}
	&.star::before {
		background-image: url('/star.svg');
	}
	&.birth::before {
		background-image: url('/cake.svg');
	}
`;

export const Rank = styled.div.attrs({
	className: 'flex gap-2 items-center font-bold p-2 rounded-xl border-solid border-[#ffffff40]'
})`
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Menu = styled(Link).attrs({
	className: 'font-bold text-xl flex items-center justify-center gap-2 w-40 p-4 bg-white/20 rounded-xl'
})`
	&:nth-child(1):hover {
		color: #5fa0d7;
	}
	&:nth-child(2):hover {
		color: #70b98b;
	}
	&:nth-child(3):hover {
		color: #e99090;
	}
	&::before {
		content: '';
		width: 16px;
		aspect-ratio: 1;
		mask: center / contain no-repeat;
	}
	&:nth-child(1)::before {
		background-color: #5fa0d7;
		mask-image: url('/link1.svg');
	}
	&:nth-child(2)::before {
		background-color: #70b98b;
		mask-image: url('/link2.svg');
	}
	&:nth-child(3)::before {
		background-color: #e99090;
		mask-image: url('/link3.svg');
	}
`;

export const Tab = styled(Link).attrs({
	className: 'flex justify-center items-center font-bold'
})`
	padding: 0;
`;

const fade = keyframes`
to { opacity: 1 }
`;

export const BirthWrap = styled.ul.attrs({
	className: 'grid grid-rows-[repeat(5,3.75rem)] gap-2 max-md:gap-0 items-center opacity-0'
})`
	&.load {
		animation: ${fade} 0.3s ease-out forwards;
	}
`;

export const List = styled.li.attrs({
	className: 'flex items-center gap-4 max-md:gap-2 pr-3 rounded-xl'
})`
	&.today {
		background-color: rgba(255, 255, 255, 0.1);
		color: var(--pink);
	}
`;
