import styled, { keyframes } from 'styled-components';
import { Wrap } from '../../components/style';

const base = '/animal_guide';

export const Wrap2 = styled(Wrap).attrs({
  className: 'pr-2 max-sm:pr-0'
})`
  @media (max-width: 480px) {
    padding-inline: 1rem;
    padding-bottom: 1rem;
  }
`;

export const CardWrap = styled.div.attrs({
  className: 'w-full grid gap-2 overflow-y-scroll'
})`
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  grid-auto-rows: min-content;

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

  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Mini = styled.button.attrs({
  type: 'button',
  className:
    'w-full pb-2 bg-(image:--glass2) shadow-(--shadow) rounded-2xl border-solid border-1 border-white/10 font-extrabold'
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
    'flex flex-col h-90 aspect-5/3 p-10 max-sm:p-5 rounded-4xl flex-row bg-(--bg) gap-8 max-sm:gap-5 backdrop-blur-xl font-extrabold opacity-0 max-md:h-auto max-md:w-120 max-md:flex-col max-md:aspect-auto max-sm:w-100 text-shadow-(--shadowW)'
})`
  border: 1px solid var(--p);
  background: linear-gradient(
    135deg,
    #8bb363,
    rgba(255, 255, 255, 0.7),
    #8bb363
  );
  box-shadow: 0 0 4px var(--c);
  animation: ${fade} 0.2s ease-out forwards;
  @media (max-width: 480px) {
    width: 20rem;
    padding: 1rem;
  }
`;

export const List = styled.span.attrs({
  className:
    'bg-(image:--glass) rounded-full py-2 px-4 text-lg max-sm:text-sm flex gap-2 text-(--c)'
})`
  &::before {
    content: '';
    width: 1rem;
    aspect-ratio: 1;
    mask: url(${base}/link2.svg) center / contain no-repeat;
    background-color: var(--p);
  }
`;

export const Close = styled.button.attrs({
  type: 'button',
  className:
    'bg-(image:--glass) rounded-full px-4 py-2 backdrop-blur-3xl font-bold opacity-0'
})`
  box-shadow: 0 0 4px var(--c);
  transition: background-color 0.1s ease-out;
  background-color: rgba(255, 255, 255, 0.5);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  animation: ${fade} 0.2s ease-out forwards;
`;
