import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from 'graphql/mutations';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {

      const token = data?.login?.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/welcome');
        console.log('Login bem-sucedido! Com Token obtido!');

      } else {
        console.log('Token não encontrado na resposta:', data);
      }
    },

    onError: (err) => {
      err.graphQLErrors.forEach((error: any) => {
        console.error('Erro GraphQL:', error.message, error.name, error.code);
      });
    },
  });

  const navigate = useNavigate();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailVerified = validateEmail();
    const passwordVerified = validatePassword();

    if (emailVerified && passwordVerified) {
      login({
        variables: {
          data: {
            email: email,
            password: password,
          },
        },
      });
    }
  };

  return (
    <>
      <h1>Bem-Vindo(a) à Instaq</h1>
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
          <button type='submit' disabled={loading}>
            {loading ? (
              <>
                <div className='custom-loader-page'></div>
              </>
            ) : (
              'Entrar'
            )}
          </button>
          {error && <p className='error-message'>{error.message}</p>}
        </div>
      </form>
    </>
  );
};
export default Login;
