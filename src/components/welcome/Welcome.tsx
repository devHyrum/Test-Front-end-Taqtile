import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuthentication();

    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);

  }, [navigate]);

  return <>{loading ? <div className='custom-loader-page' /> : <h3>Welcome</h3>}</>;
};
export default Welcome;
