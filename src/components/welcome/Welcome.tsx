import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';
import { GET_USERS } from 'graphql/query';

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

  return (
    <div className='page-welcome'>
      <h1>Lista de Usuários</h1>
      {loading && !users.length ? (
        <div className='custom-loader-page'></div>
      ) : (
        <>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <span className='nome-registrado'>{user.name}</span> -&nbsp;
                <span className='email-registrado'>{user.email}</span>
              </li>
            ))}
          </ul>
          {data?.users.pageInfo.hasNextPage && (
            <button onClick={loadMoreUsers} className='load-more-btn'>
              Carregar Mais
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Welcome;
