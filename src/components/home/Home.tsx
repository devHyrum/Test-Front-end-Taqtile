import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormButton, TitleHeader } from 'styles/styles';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const buttonFuction = () => {
    navigate('/login');
  };
  return (
    <>
      <TitleHeader>Site Instaq</TitleHeader>
      <p>Home Page</p>
      <FormButton onClick={buttonFuction}>Entrar</FormButton>
    </>
  );
};
export default Welcome;
