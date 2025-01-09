import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <>
      <form className='container-login'>
        <div className='box-email'>
          <label htmlFor='email'>E-mail</label>
          <input type='text' placeholder='email@exemplo.com' name='uname' required />
        </div>
        <div className='box-password'>
          <label htmlFor='password'>Senha</label>
          <input type='password' placeholder='*****' name='psw' required />
        </div>
        <div className='box-submit'>
          <button type='submit'>Entrar</button>
        </div>
      </form>
    </>
  );
};
export default Login;
