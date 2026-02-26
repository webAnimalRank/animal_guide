import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Glass, Loading } from '../../components/style';

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

export const Menu = styled(Glass).attrs({
	as: Link,
	className: 'font-extrabold text-xl flex items-center justify-center gap-2 w-40 p-4'
})`
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
	transition: color 0.1s ease-out;
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
		mask-image: url('${base}/link1.svg');
	}
	&:nth-child(2)::before {
		background-color: #70b98b;
		mask-image: url('${base}/link2.svg');
	}
	&:nth-child(3)::before {
		background-color: #e99090;
		mask-image: url('${base}/link3.svg');
	}
`;

export const Tab = styled(Link).attrs({
	className: 'h-15 flex justify-center items-center font-bold'
})`
	flex: 1;
	padding: 0;
`;

export const List = styled.li.attrs({
	className: 'flex items-center gap-4 max-md:gap-2 pr-3 rounded-xl'
})`
	&.today {
		background-color: rgba(255, 255, 255, 0.5);
	}
`;