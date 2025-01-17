import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';
import { GET_USERS } from 'graphql/query';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    };

    checkAuthentication();
  }, [navigate]);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      data: {},
    },
  });

  if (loading) {
    return <div className='custom-loader-page' />;
  }

  if (error) {
    return <div>Erro ao carregar os usuários: {error.message}</div>;
  }

  const users = data?.users?.nodes || [];

  return (
    <main>
      <h1>Lista de Usuários</h1>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul className='user-list'>
          {users.map((user: { id: string; name: string; email: string }) => (
            <li key={user.id} className='user-item'>
              <span className='user-name'>{user.name}</span> - <span className='user-email'>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Welcome;
