import styled from 'styled-components';
import { Wrap } from '../../components/style';

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
