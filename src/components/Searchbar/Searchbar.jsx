import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';

// Componenta pentru căutare
export const Searchbar = ({ handleSubmit }) => {
  const [search, setSearch] = useState('');

  // funcția pentru resetarea câmpului de introducere
  const resetForm = () => {
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form
        // funcția pentru trimiterea cererii
        onSubmit={evt => {
          evt.preventDefault(); // anularea comportamentului implicit al browserului

          // verificarea cererii goale
          if (!search) {
            return toast.error('Introduceți textul pentru căutare.'); // mesaj de eroare
          }

          // apelarea funcției din App.jsx pentru trimiterea cererii
          handleSubmit(search);
          resetForm();
        }}
        className={css.Form}
      >
        {/* iconița de căutare */}
        <button type="submit" className={css.Button}>
          <BiSearch size="20" />
        </button>

        {/* câmpul de introducere */}
        <input
          value={search}
          onChange={evt => setSearch(evt.target.value)} // actualizarea stării câmpului de căutare
          className={css.Input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus // focalizare automată pe câmpul de introducere
          placeholder="Căutați imagini și fotografii"
        />
      </form>
    </header>
  );
};
