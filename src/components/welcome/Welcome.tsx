import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

const Welcome: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }
  }
  useEffect(() => {
    checkAuthentication();
      const timeout = setTimeout(() => {
        setUsers([
          { id: 1, name: 'João Da Silva', email: 'joaodasilva@gmail.com' },
          { id: 2, name: 'Maria Araujo', email: 'mariaaraujo@gmail.com' },
          { id: 3, name: 'Francisco Lima', email: 'franciscolima@gmail.com' },
          { id: 4, name: 'Waldir Jose Vieira', email: 'waldirvieira@gmail.com' },
          { id: 5, name: 'Jonatan Moises Olivera Fernandez', email: 'jonatanolivera@gmail.com' },
        ]);
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [navigate]);

  return (
    <>
      {loading ? (
        <div className='custom-loader-page'></div>
      ) : (
        <main>
          <h1> Lista de Usuarios</h1>
          <ul className='user-list'>
            {users.map((user) => (
              <li key={user.id} className='user-item'>
                <span className='user-name'>{user.name}</span> - <span className='user-email'>{user.email}</span>
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
};
export default Welcome;
