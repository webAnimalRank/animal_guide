import styled from 'styled-components';
import { Btn } from '../../components/style';
import { SelectBox } from '../popularity/popularity.style';

export const Fold = styled.button.attrs({
  type: 'button',
  className: 'border-b-2 flex justify-between pb-1 text-2xl font-extrabold'
})`
  &::after {
    content: '';
    width: 0.8rem;
    aspect-ratio: 1;
    background: url(/fold.svg) center / contain no-repeat;
    translate: -1rem;
    transition: scale 0.2s ease-out;
    scale: 1 -1;
  }
  &.fold::after {
    scale: 1 1;
  }
`;

export const Form = styled.form.attrs({
  className: 'flex flex-col gap-6 w-full p-2 font-bold max-sm:text-sm'
})``;

export const ImgIcon = styled.button.attrs({
  type: 'button',
  className:
    'rounded-full bg-white/20 p-4 hover:bg-white/30 transition-colors duration-300 ease-out'
})`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Select = styled.button.attrs({
  type: 'button',
  className:
    'bg-white/20 rounded-2xl flex justify-center p-2 hover:bg-white/30 transition-color duration-300 ease-out aspect-square'
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
  className: 'w-max self-end -translate-x-2'
})``;

export const Tag = styled.span.attrs({
  className: 'bg-(--c)/80 text-white rounded-md text-xs py-1 px-2'
})``;

export const Action = styled.button.attrs({
  type: 'button',
  className: 'size-3 hover:opacity-70'
})`
  background: url(/fold.svg) center / contain no-repeat;
  &.prev {
    rotate: 90deg;
  }
  &.next {
    rotate: -90deg;
  }
  &:disabled {
    opacity: 0.3;
  }
`;

export const ResultBox = styled(SelectBox).attrs({
  as: 'div',
  className: 'h-50 max-sm:h-35 aspect-3/4 cursor-default!'
})``;
