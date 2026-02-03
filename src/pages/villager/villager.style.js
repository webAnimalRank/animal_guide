import styled, { keyframes } from 'styled-components';
import { Glass, Scroll, Wrap } from '../../components/style';

const base = '/animal_guide';

export const Wrap2 = styled(Wrap)`
  scrollbar-gutter: stable;
  padding-right: 0.5rem;
  padding-top: 1.5rem;
  @media (max-width: 480px) {
    padding-inline: 1rem;
    padding-bottom: 1rem;
  }
`;

export const CardWrap = styled(Scroll).attrs({
  className: 'w-full grid gap-2'
})`
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  grid-auto-rows: min-content;
`;

export const Mini = styled(Glass).attrs({
  as: 'button',
  type: 'button',
  className: 'w-full pb-2 font-extrabold'
})`
  img {
    width: 100%;
  }
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const fade = keyframes`
to { opacity: 1 }
`;

export const Card = styled.div.attrs({
  className:
    'flex flex-col h-90 p-10 max-sm:p-5 rounded-4xl flex-row gap-8 max-sm:gap-5 backdrop-blur-xl font-bold opacity-0 max-md:h-auto max-md:w-120 max-md:flex-col max-sm:w-100'
})`
  border: 1px solid var(--c);
  background-color: #776644;
  color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 4px var(--c);
  animation: ${fade} 0.2s ease-out forwards;
  @media (max-width: 480px) {
    width: 20rem;
    padding: 1rem;
  }
`;

export const List = styled(Glass).attrs({
  className:
    'rounded-full py-2 px-4 text-base font-medium max-sm:text-sm flex gap-2 text-shadow-(--shadow)'
})`
  &::before {
    content: '';
    width: 1rem;
    aspect-ratio: 1;
    background: url(${base}/link2.svg) center / contain no-repeat;
  }
`;

export const Close = styled(Glass).attrs({
  as: 'button',
  type: 'button',
  className:
    'rounded-full px-4 py-2 backdrop-blur-3xl text-sm font-bold opacity-0'
})`
  box-shadow: 0 0 4px var(--c);
  transition: background-color 0.1s ease-out;
  background-color: rgba(255, 255, 255, 0.5);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  animation: ${fade} 0.2s ease-out forwards;
`;
