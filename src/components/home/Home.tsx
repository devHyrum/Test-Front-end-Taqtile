import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const buttonFuction = () => {
    navigate('/login')
  }

  return (
    <>
      <h1>Site Instaq</h1>
      <p>Home Page</p>
      <button className='default-button' onClick={buttonFuction}>Entrar</button>
    </>
  );
};
export default Welcome;
