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
} from 'utils/validators';
import './AddUser.css';

const AddUser: React.FC = () => {
  const [formState, setFormState] = useState({
    email: { value: '', error: null },
    password: { value: '', error: null },
    name: { value: '', error: null },
    phone: { value: '', error: null },
    birthDate: { value: '', error: null },
    role: { value: '', error: null },
  });

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

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [navigate]);

  const updateField = (field: string, value: string, error: string | null = null) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { value, error },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailError = validateEmail(formState.email.value);
    const passwordError = validatePassword(formState.password.value);
    const nameError = validateName(formState.name.value);
    const birthDateError = validateBirthDate(formState.birthDate.value);
    const phoneError = validatePhone(formState.phone.value);
    const roleError = validateRole(formState.role.value);

    updateField('email', formState.email.value, emailError);
    updateField('password', formState.password.value, passwordError);
    updateField('name', formState.name.value, nameError);
    updateField('birthDate', formState.birthDate.value, birthDateError);
    updateField('phone', formState.phone.value, phoneError);
    updateField('role', formState.role.value, roleError);

    if (!emailError && !passwordError && !nameError && !birthDateError && !phoneError && !roleError) {
      create({
        variables: {
          data: {
            email: formState.email.value,
            name: formState.name.value,
            birthDate: formState.birthDate.value,
            password: formState.password.value,
            phone: formState.phone.value,
            role: formState.role.value,
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
            value={formState.email.value}
            onChange={(e) => updateField('email', e.target.value)}
          />
          {formState.email.error && <p className='error-message'>{formState.email.error}</p>}
        </div>
        <div className='box-password'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            placeholder='*****'
            name='password'
            value={formState.password.value}
            onChange={(e) => updateField('password', e.target.value)}
          />
          {formState.password.error && <p className='error-message'>{formState.password.error}</p>}
        </div>
        <div className='box-name'>
          <label htmlFor='name'>Nome</label>
          <input
            type='text'
            placeholder='João Araujo'
            name='name'
            value={formState.name.value}
            onChange={(e) => updateField('name', e.target.value)}
          />
          {formState.name.error && <p className='error-message'>{formState.name.error}</p>}
        </div>
        <div className='box-phone'>
          <label htmlFor='phone'>Telefone</label>
          <input
            type='tel'
            placeholder='00 9999-9999'
            name='phone'
            className='number-phone'
            maxLength={11}
            value={formState.phone.value}
            onChange={(e) => updateField('phone', e.target.value)}
          />
          {formState.phone.error && <p className='error-message'>{formState.phone.error}</p>}
        </div>
        <div className='box-birthDate'>
          <label htmlFor='phone'>Data de nascimento</label>
          <input
            type='date'
            name='birthDate'
            value={formState.birthDate.value}
            onChange={(e) => updateField('birthDate', e.target.value)}
          />
          {formState.birthDate.error && <p className='error-message'>{formState.birthDate.error}</p>}
        </div>
        <div className='box-role'>
          <label htmlFor='phone'>Role</label>
          <select name='role' value={formState.role.value} onChange={(e) => updateField('role', e.target.value)}>
            <option value='' disabled>
              Selecione uma opção
            </option>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </select>
          {formState.role.error && <p className='error-message'>{formState.role.error}</p>}
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
