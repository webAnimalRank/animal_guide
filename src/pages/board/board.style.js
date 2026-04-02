import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const TabWrap = styled.div.attrs({
  className: 'flex gap-6 w-max self-center'
})``;

export const TabBtn = styled.button.attrs({
  type: 'button',
  className: 'font-extrabold text-xl relative opacity-60'
})`
  &:hover {
    opacity: 0.8;
  }
  &.active {
    opacity: 1;
  }
`;

export const Line = styled(Link).attrs({
  className:
    'border-b border-white/30 py-1 max-sm:px-1 flex-0 font-semibold flex items-center hover:bg-white/10'
})``;

export const Undo = styled(Link).attrs({
  to: '/board',
  className: 'font-semibold flex items-center gap-1 hover:opacity-70'
})`
  &::before {
    content: '';
    width: 1.5rem;
    aspect-ratio: 1;
    background: url(/undo.svg) center / contain no-repeat;
  }
`;

export const Toast = styled.div.attrs({
  className:
    'text-sm absolute left-1/2 top-1/2 -translate-1/2 bg-(--c)/90 py-2 px-4 rounded-md pointer-events-none'
})``;
