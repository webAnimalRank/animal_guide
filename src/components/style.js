import { NavLink } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import LeafImg from '../assets/img/Leaf.svg?react';
import LeafImg2 from '../assets/img/Leaf2.svg?react';
import NookImg from '../assets/img/Nook_Miles.svg?react';

const move = keyframes`
20% { translate: 0 -5px; }
80% { translate: 0 5px; }
`;

const run = keyframes`
3%, 23%, 58%, 78% { rotate: -20deg; }
5%, 25%, 55%, 75% { transform: translateY(-30%); }
8%, 28%, 53%, 73% { rotate: 20deg; }
10%, 20%, 30%, 50%, 60%, 70%, 80%, 100% { transform: translateY(0%); rotate: 0deg; }
40%, 100% { scale: 1; }
50% { translate: var(--run-dist) 0; }
50%, 90% { scale: -1 1; }
100% { translate: 0; }
`;

const wave = keyframes`
0%, 100% { translate: 0; rotate: 0; }
50% { translate: 0 -20px; rotate: 15deg; }
`;

const fade = keyframes`
to { opacity: 0; }
`;

export const LoadingWrap = styled.div.attrs({
  className: 'fixed inset-0 z-100 bg-(--c) flex items-center justify-center'
})`
  ${(props) =>
    props.$isFade &&
    css`
      animation: ${fade} 0.5s ease-out forwards;
    `}
`;

export const Nook = styled(NookImg).attrs({
  className: 'size-20'
})`
  --run-dist: 500%;
  animation: ${run} 8s ease-in-out infinite;

  @media (max-width: 38rem) {
    --run-dist: 440%;
    animation-duration: 7s;
  }
  @media (max-width: 36rem) {
    --run-dist: 380%;
  }
  @media (max-width: 34rem) {
    --run-dist: 330%;
  }
  @media (max-width: 480px) {
    --run-dist: 220%;
  }
`;

const leafStyle = css`
  width: 2rem;
  fill: var(--p);
  animation: ${wave} 1.2s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay || '0s'};
  @media (max-width: 40rem) {
    width: 1.5rem;
  }
  @media (max-width: 480px) {
    width: 1rem;
  }
`;

export const Leaf1 = styled(LeafImg)`
  ${leafStyle}
`;
export const Leaf2 = styled(LeafImg2)`
  ${leafStyle}
`;

export const Head = styled.header.attrs({
  className:
    'z-50 fixed w-full h-[70px] flex justify-center pb-1 max-sm:h-[50px] bg-(--cw)'
})`
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
`;

export const Menu = styled.button.attrs({
  type: 'button',
  className:
    'size-10 absolute left-5 z-30 rounded-full shadow-(--shadow) md:hidden'
})`
  mask: url('/menu.svg') center / 70% no-repeat;
  background-color: var(--p);
`;

export const Url = styled(NavLink).attrs({
  className: 'font-bold'
})`
  &.login {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  &.login::after {
    content: '';
    width: 22px;
    aspect-ratio: 1;
    mask: url('/login.svg') center / contain no-repeat;
    background-color: var(--p);
  }
  &.login:hover::after {
    animation: ${move} 0.7s ease-out infinite;
  }
  @media (max-width: 48rem) {
    &.login {
      font-size: 0;
    }
    &.sign {
      display: none;
    }
  }
`;

export const Page = styled(Url).attrs({
  className: 'page relative max-md:hidden'
})`
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--p);
    scale: 0 1;
    transition: scale 0.2s ease-out;
    transform-origin: left;
  }
  &:hover::after {
    scale: 1 1;
  }
  &.active {
    font-weight: 900;
  }
  &.active::after {
    scale: 1 1;
  }
`;

export const Glass = styled.div.attrs({
  className:
    'bg-(image:--glass2) shadow-(--shadow) rounded-2xl border-solid border-1 border-white/10'
})``;

export const Box = styled.div.attrs({
  className:
    'rounded-3xl p-5 h-max flex flex-col gap-4 bg-white/10 shadow-(--shadow)'
})``;

export const Wrap = styled.div.attrs({
  className:
    'max-w-7xl w-full h-max min-h-full px-6 pt-23 max-sm:pt-16 pb-6 max-sm:pb-4 max-sm:px-4 flex flex-col gap-5'
})``;

export const Btn = styled.button.attrs({
  type: 'button',
  className:
    'self-end text-white/80 rounded-lg px-3 py-1 font-bold hover:bg-(--cw)'
})``;

export const PageBtn = styled.button.attrs({
  type: 'button',
  className: 'text-sm font-bold relative rounded-md size-7'
})`
  background: center / contain no-repeat;

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:is(.first, .prev) {
    scale: -1;
  }
  &:is(.next, .prev) {
    background-image: url(/angle.svg);
  }
  &:is(.last, .first) {
    background-image: url(/angle2.svg);
  }
  &:disabled:not(.active) {
    opacity: 0.3;
  }
  &:disabled:hover {
    cursor: default;
  }
  &:not(:disabled):hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Icon = styled.button.attrs({
  className: 'size-12 max-sm:size-9 p-0.5 rounded-full hover:bg-white/10'
})``;

export const Loading = styled.div.attrs({
  className: 'aspect-square animate-spin opacity-30'
})`
  background: url(/load.svg) center / contain no-repeat;
`;

export const Search = styled.input.attrs({
  type: 'search',
  className:
    'outline-none font-bold w-50 max-sm:text-sm py-2 px-4 rounded-lg bg-white/60 text-(--c) backdrop-blur-3xl shadow-(--shadow)'
})``;
