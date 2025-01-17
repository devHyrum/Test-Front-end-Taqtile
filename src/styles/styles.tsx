import styled from 'styled-components';
import { buttonBaseStyles, circularButtonStyles } from './baseStyles';

export const TitleHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: black #000000;
  margin: 20px 0px 20px 0px;
`;

export const FormButton = styled.button`
  ${buttonBaseStyles};
  background-color: #7356f7;
  height: 44px;
  border-radius: 2rem;
  width: 100%;

  &:hover {
    background-color: #603ef5;
  }

  &:focus {
    background-color: #7870f0;
  }

  &:disabled {
    cursor: default;
    background-color: #a693f7;
  }
`;

export const CircularButtonPage = styled.button`
  ${circularButtonStyles};
  background-color: #40b3f5;

  &:hover {
    background-color: #1ea4f1;
  }

  &:focus {
    background-color: #0097ee;
  }
`;

export const CircularButtonModal = styled(CircularButtonPage)`
  background-color: #7356f7;

  &:hover {
    background-color: #603ef5;
  }

  &:focus {
    background-color: #7870f0;
  }
`;

export const LabelForm = styled.label`
  display: flex;
  font-size: 12px;
  font-weight: 400;
  color: gray;
  margin-bottom: 12px;
`;

export const InputForm = styled.input`
  border-radius: 2rem;
  height: 2.5rem;
  padding: 0.6em 1.2em;
  border: 1px solid gray;
  outline: none;
  width: 100%;
  box-sizing: border-box;
`;
export const MessageErrorForm = styled.p`
  color: red;
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
  text-align: end;
`;
