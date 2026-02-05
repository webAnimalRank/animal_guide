import styled from 'styled-components';
import { Scroll } from '../../components/style';

const base = '/animal_guide';

export const Fold = styled.button.attrs({
	type: 'button',
	className: 'border-b-2 flex justify-between pb-1 text-2xl font-extrabold'
})`
	&::after {
		content: '';
		width: 0.8rem;
		aspect-ratio: 1;
		background: url(${base}/fold.svg) center / contain no-repeat;
		translate: -1rem;
	}
	&.fold::after {
		scale: -1;
	}
`;

export const Form = styled.form.attrs({
	className: 'flex gap-6 w-full p-2 text-lg font-bold max-sm:flex-col'
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

export const Edit = styled.button.attrs({
	type: 'submit',
	className: 'w-max self-end text-white bg-(--c) rounded-lg py-1 px-3 mr-2'
})``;
