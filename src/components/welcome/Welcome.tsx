import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';
import { GET_USERS } from '../../graphql/query';

const Welcome: React.FC = () => {
  const [users, setUsers] = useState<{ name: string; email: string; id: string }[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const navigate = useNavigate();

  const { loading, data, fetchMore } = useQuery(GET_USERS, {
    variables: {
      data: {
        limit,
        offset,
      },
    },
  });

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    if (data) {
      setUsers((prevUsers) => [...prevUsers, ...data.users.nodes]);
    }
  }, [data]);

  const loadMoreUsers = () => {
    if (data?.users.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          data: {
            limit,
            offset: offset + limit,
          },
        },
      });
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='page-welcome'>
      <header className='header'>
        <button onClick={logout} className='logout-button'>
          Sair
        </button>
        <h1>Lista de Usuários</h1>
      </header>
      {loading && !users.length ? (
        <div className='custom-loader-page' />
      ) : (
        <ul className='user-list'>
          {users.map((user: { id: string; name: string; email: string }) => (
            <li key={user.id} className='user-item'>
              <span className='user-name'>{user.name}</span> - <span className='user-email'>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Welcome;
