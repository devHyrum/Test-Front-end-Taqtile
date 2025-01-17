import { css } from 'styled-components';

export const buttonBaseStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
`;

export const circularButtonStyles = css`
  ${buttonBaseStyles};
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1.5rem;
`;
