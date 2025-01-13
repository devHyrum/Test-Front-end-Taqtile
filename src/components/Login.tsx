import React, { useState } from 'react';
import './Login.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (): boolean => {
    if (!email) {
      setEmailError('O campo de e-mail é obrigatório');
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      return false;
    }

    setEmailError(null);
    return true;
  };

  const validatePassword = (): boolean => {
    if (!password) {
      setPasswordError('O campo senha é obrigatorio');
      return false;
    }

    if (password.length < 7) {
      setPasswordError('A senha deve ser de mínimo 7 caracteres');
      return false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError('A senha deve ter pelo menos um dígito e uma letra');
      return false;
    }

    setPasswordError(null);
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailVerified = validateEmail();
    const passwordVerified = validatePassword();

    if (emailVerified && passwordVerified) {
      console.log('Formulário válido, enviando dados...');
    }
  };

  return (
    <>
      <form className='container-login' onSubmit={handleSubmit}>
        <div className='box-email'>
          <label htmlFor='email'>E-mail</label>
          <input
            placeholder='email@exemplo.com'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className='error-message'>{emailError}</p>}
        </div>
        <div className='box-password'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            placeholder='*****'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className='error-message'>{passwordError}</p>}
        </div>
        <div className='box-submit'>
          <button type='submit'>Entrar</button>
        </div>
      </form>
    </>
  );
};
export default Login;
