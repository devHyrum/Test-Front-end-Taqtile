import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validators';


const Login: React.FC = () => {
  const [formState, setFormState] = useState({
    email: { value: '', error: null },
    password: { value: '', error: null },
  });

  const updateField = (field: string, value: string, error: string | null = null) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { value, error },
    }));
  };

  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {

      const token = data?.login?.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/welcome');
      }
    },

    onError: (err) => {
      err.graphQLErrors.forEach((error: any) => {
        console.error('Erro GraphQL:', error.message, error.name, error.code);
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(formState.email.value);
    const passwordError = validatePassword(formState.password.value);

    updateField('email', formState.email.value, emailError);
    updateField('password', formState.password.value, passwordError);

    if (!emailError && !passwordError) {
      login({
        variables: {
          data: {
            email: formState.email.value,
            password: formState.password.value,
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
          {error && <p className='error-message'>Hola a todos, como estan? soy hyrum, sou do brasil, aqui no peru</p>}
        </div>
      </form>
    </>
  );
};
export default Login;