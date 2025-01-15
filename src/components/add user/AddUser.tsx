import { useMutation } from '@apollo/client';
import { CREATE_MUTATION } from 'graphql/mutations';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  validateBirthDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateRole,
} from 'utils/validation';
import './AddUser.css';

const AddUser: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [role, setRole] = useState<string>('');
  const [roleError, setRoleError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [create, { loading, error }] = useMutation(CREATE_MUTATION, {
    onCompleted: () => {
      setShowSuccessModal(true);
    },

    onError: (err) => {
      err.graphQLErrors.forEach((error: any) => {
        console.error('Erro GraphQL:', error.message, error.name, error.code);
      });
    },
  });
  const navigate = useNavigate();

  const backButton = () => {
    navigate('/welcome');
  };

    useEffect(() => {
    }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    const isBirthDateValid = validateBirthDate(birthDate);
    const isRoleValid = validateRole(role);
  
    setEmailError(isEmailValid);
    setPasswordError(isPasswordValid);
    setNameError(isNameValid);
    setPhoneError(isPhoneValid);
    setBirthDateError(isBirthDateValid);
    setRoleError(isRoleValid);

    if (!isEmailValid && !isPasswordValid && !isNameValid && !isPhoneValid && !isBirthDateValid && !isRoleValid) {
      create({
        variables: {
          data: {
            email: email,
            name: name,
            birthDate: birthDate,
            password: password,
            phone: phone,
            role: role,
          },
        },
      });
    }
  };
  return (
    <div>
      <header>
        <button className='button-more-users' onClick={backButton}>
          ←
        </button>
        <h3>Criação de um novo usuario</h3>
      </header>

      <form className='container-create-user' onSubmit={handleSubmit}>
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
        <div className='box-name'>
          <label htmlFor='name'>Nome</label>
          <input
            type='text'
            placeholder='João Araujo'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className='error-message'>{nameError}</p>}
        </div>
        <div className='box-phone'>
          <label htmlFor='phone'>Telefone</label>
          <input
            type='tel'
            placeholder='00 9999-9999'
            name='phone'
            className='number-phone'
            maxLength={11}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <p className='error-message'>{phoneError}</p>}
        </div>
        <div className='box-birthDate'>
          <label htmlFor='phone'>Data de nascimento</label>
          <input type='date' name='birthDate' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          {birthDateError && <p className='error-message'>{birthDateError}</p>}
        </div>
        <div className='box-role'>
          <label htmlFor='phone'>Role</label>
          <select name='role' value={role} onChange={(e) => setRole(e.target.value)}>
            <option value='' disabled>
              Selecione uma opção
            </option>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </select>
          {roleError && <p className='error-message'>{roleError}</p>}
        </div>
        <div className='box-submit'>
          <button className='default-button' type='submit' disabled={loading}>
            {loading ? (
              <>
                <div className='custom-loader-page' />
              </>
            ) : (
              'Criar novo usuario'
            )}
          </button>
          {error && <p className='error-message'>{error.message}</p>}
        </div>
      </form>

      {showSuccessModal && (
        <>
          <div className='modal-overlay' />
          <div className='success-modal'>
            <p>Usuário criado com sucesso!</p>
            <button
              className='default-button'
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/welcome');
              }}
            >
              OK
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default AddUser;
