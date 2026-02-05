import styled from 'styled-components';
import { Btn } from '../../components/style';

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
		transition: scale 0.2s ease-out;
	}
	&.fold::after {
		scale: 1 -1;
	}
`;

export const Form = styled.form.attrs({
	className: 'flex gap-6 w-full p-2 font-bold max-sm:flex-col max-sm:text-sm'
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
	className: 'w-max self-end py-1 px-3 mr-2'
})``;

export const Tag = styled.span.attrs({
	className: 'bg-(--c) text-white rounded-md text-xs py-1 px-2'
})``;
