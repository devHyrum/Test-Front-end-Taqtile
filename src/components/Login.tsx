import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <>
      <form className='container-login'>
        <label htmlFor='uname'>E-mail</label>
        <input type='text' placeholder='email@exemplo.com' name='uname' required />
        <label htmlFor='psw'>Senha</label>
        <input type='password' placeholder='*****' name='psw' required />
        <button type='submit'>Entrar</button>
      </form>
    </>
  );
};
export default Login;
