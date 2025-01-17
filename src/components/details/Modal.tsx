import React from 'react';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  userId: string | null;
  userData: any;
  loading: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, userId, userData, loading }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          ×
        </button>
        {loading ? (
          <div className='custom-loader-page' />
        ) : userData ? (
          <div className='user-details'>
            <h2>Detalhes do Usuário</h2>
            <p>
              <strong>ID:</strong> {userId}
            </p>
            <p>
              <strong>Nome:</strong> {userData.user.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.user.email}
            </p>
            <p>
              <strong>Data de Nascimento:</strong> {userData.user.birthDate}
            </p>
            <p>
              <strong>Telefone:</strong> {userData.user.phone}
            </p>
            <p>
              <strong>Função:</strong> {userData.user.role}
            </p>
          </div>
        ) : (
          <p>Detalhes do usuário não encontrados.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
