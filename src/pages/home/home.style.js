import styled from 'styled-components';
import { Link } from 'react-router-dom';

const base = '/animal_guide';

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
		background-image: url('${base}/star.svg');
	}
	&.birth::before {
		background-image: url('${base}/cake.svg');
	}
`;

export const Rank = styled.div.attrs({
	className: 'flex gap-2 items-center font-bold p-2 rounded-xl border-solid border-[#ffffff40]'
})`
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Menu = styled(Link).attrs({
	className:
		'font-extrabold text-xl flex justify-center gap-2 w-40 p-4 bg-(image:--glass) rounded-2xl border-solid border-1 border-white/10 shadow-(--shadow)'
})`
	transition: color 0.1s ease-out;
	&:nth-child(1):hover {
		color: #5fa0d7;
	}
	&:nth-child(2):hover {
		color: #11a983;
	}
	&:nth-child(3):hover {
		color: #e99090;
	}
	&::before {
		content: '';
		width: 16px;
		aspect-ratio: 1;
		background: center / contain no-repeat;
	}
	&:nth-child(1)::before {
		background-image: url('${base}/link1.svg');
	}
	&:nth-child(2)::before {
		background-image: url('${base}/link2.svg');
	}
	&:nth-child(3)::before {
		background-image: url('${base}/link3.svg');
	}
`;
