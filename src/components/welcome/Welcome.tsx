import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';
import { GET_USERS, GET_USER } from 'graphql/query';
import Modal from 'components/details/Modal';

const Welcome: React.FC = () => {
  const [users, setUsers] = useState<{ name: string; email: string; id: string }[]>([]);
  const [offset, setOffset] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [fetchUserDetails, { data: userData, loading: userLoading }] = useLazyQuery(GET_USER);

  const buttonFunction = () => {
    navigate('/add-user');
  };

  useEffect(() => {
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
      setUsers((prevUsers) => {
        const newUsers = data.users.nodes.filter((user) => !prevUsers.some((prevUser) => prevUser.id === user.id));
        return [...prevUsers, ...newUsers];
      });
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

  const openModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
    fetchUserDetails({ variables: { userId } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className='page-welcome'>
      <header>
        <h1>Lista de Usuários</h1>
        <button className='button-more-users' onClick={buttonFunction}>
          +
        </button>
      </header>
      {loading && !users.length ? (
        <div className='custom-loader-page' />
      ) : (
        <>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <div>
                  <span className='user-name'>{user.name}</span>&nbsp;-&nbsp;
                  <span className='user-email'>{user.email}</span>
                </div>
                <button className='see-details' onClick={() => openModal(user.id)}>
                  ≡
                </button>
              </li>
            ))}
          </ul>
          {data?.users.pageInfo.hasNextPage && (
            <button onClick={loadMoreUsers} className='default-button'>
              Carregar Mais
            </button>
          )}
        </>
      )}
      {isModalOpen && <Modal onClose={closeModal} userId={selectedUserId} userData={userData} loading={userLoading} />}
    </div>
  );
};

export default Welcome;
