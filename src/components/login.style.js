import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Form = styled.form.attrs({
  className: 'flex flex-col w-80 gap-4'
})`
  @media (max-width: 480px) {
		width: 15rem;
    gap: 0.5rem;
  }
`;

export const Field = styled.label.attrs({
  className: 'bg-white rounded-2xl p-4'
})`
  input {
    font-weight: 700;
    width: 100%;
  }
  @media (max-width: 480px) {
    padding-block: 0.75rem;
  }
`;

export const Btn = styled.button.attrs({
	type: 'submit',
	className: 'rounded-2xl bg-(--c) p-3 text-white font-extrabold text-xl mt-5'
})`
  border: 3px solid var(--c);
  transition: background-color 0.1s ease-out;
  &:hover {
    background-color: var(--p);
  }
`;

export const Btn2 = styled(Link).attrs({
  type: 'button',
  className: 'w-max self-center font-extrabold text-lg relative'
})`
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    inset-inline: 0;
    height: 2px;
    background-color: var(--p);
    scale: 0 1;
    transition: scale 0.2s ease-out;
    transform-origin: left;
  }
  &:hover::after {
    scale: 1 1;
  }
`;
