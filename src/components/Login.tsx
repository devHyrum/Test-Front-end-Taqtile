import React, { useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [senha, setSenha] = useState<string>('');
  const [errorSenha, setErrorSenha] = useState<string | null>(null);

  const validateEmail = (): boolean => {
    if (!email) {
      setErrorEmail('O campo de e-mail é obrigatório');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    const senhaRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;
    if (!senhaRegex.test(senha)) {
      setErrorSenha('A senha deve ter pelo menos um dígito e uma letra');
      return false;
    }

    setErrorSenha(null);
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValido = validateEmail();
    const senhaValida = validateSenha();

    if (emailValido && senhaValida) {
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
          <button type='submit'>Entrar</button>
        </div>
      </form>
    </>
  );
};
export default Login;
