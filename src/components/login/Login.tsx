import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const senhaRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [senha, setSenha] = useState<string>('');
  const [errorSenha, setErrorSenha] = useState<string | null>(null);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const validateEmail = (): boolean => {
    if (!email) {
      setErrorEmail('O campo de e-mail é obrigatório');
      return false;
    }

    if (!emailRegex.test(email)) {
      setErrorEmail('Por favor, insira um e-mail válido.');
      return false;
    }

    setErrorEmail(null);
    return true;
  };

  const validateSenha = (): boolean => {
    if (!senha) {
      setErrorSenha('O campo senha é obrigatorio');
      return false;
    }

    if (senha.length < 7) {
      setErrorSenha('A senha deve ser de mínimo 7 caracteres');
      return false;
    }

    if (!senhaRegex.test(senha)) {
      setErrorSenha('A senha deve ter pelo menos um dígito e uma letra');
      return false;
    }

    setErrorSenha(null);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('tocaste');
    const emailValido = validateEmail();
    const senhaValida = validateSenha();
    if (emailValido && senhaValida) {
      try {
        const response = await login({
          variables: {
            data: {
              email: email,
              password: senha,
            },
          },
        });

        const token = response?.data?.login?.token;

        if (token) {
          console.log('Login bem-sucedido! Token:', token);
          navigate('/welcome');
        } else {
          console.error('Token não encontrado na resposta:', response);
        }
      } catch (err: any) {
        err.graphQLErrors.forEach((error: any) => {
          console.error('Erro GraphQL:', error.message, error.name, error.code);
        });
      }
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
          {errorEmail && <p className='error-message'>{errorEmail}</p>}
        </div>
        <div className='box-password'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            placeholder='*****'
            name='password'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {errorSenha && <p className='error-message'>{errorSenha}</p>}
        </div>
        <div className='box-submit'>
          <button type='submit' disabled={loading}>
            {loading ? (
              <>
                <div className='custom-loader-button'></div>
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
