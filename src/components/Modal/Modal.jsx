import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './Modal.module.css';

// Caută modalul pentru a-l adăuga dinamic în arborele DOM al paginii
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const keyDown = evt => {
      // verifică codul tastei
      if (evt.code === 'Escape') {
        closeModal(); // închide modalul
      }
    };

    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [closeModal]);

  // închiderea modalului la clic pe fundal
  const handleClose = evt => {
    // verifică dacă clicul a fost pe fundal
    if (evt.currentTarget === evt.target) {
      closeModal(); // închide modalul
    }
  };

  return ReactDOM.createPortal(
    <div onClick={handleClose} className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};
