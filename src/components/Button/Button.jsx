// Button.jsx
import React from 'react';
import css from './Button.module.css'; // importăm stilurile

// Componenta funcțională care gestionează butonul
export const Button = ({ clickLoad }) => {
  return (
    <button onClick={clickLoad} className={css.Button} type="button">
      Load more
    </button>
  );
};
