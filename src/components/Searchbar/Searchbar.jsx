import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';

// Componenta pentru căutare
export class Searchbar extends Component {
  state = {
    search: '',
  };

  // funcția pentru modificarea stării
  onChangeInput = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value }); // modificarea stării după cheie
  };

  // funcția pentru resetarea câmpului de introducere
  resetForm = () => {
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form
          // funcția pentru trimiterea cererii
          onSubmit={evt => {
            evt.preventDefault(); // anularea comportamentului implicit al browserului

            // verificarea cererii goale
            if (!this.state.search) {
              return toast.error('Introduceți textul pentru căutare.'); // mesaj de eroare
            }

            // apelarea funcției din App.jsx pentru trimiterea cererii
            this.props.handleSubmit(this.state.search);
            this.resetForm();
          }}
          className={css.Form}
        >
          {/* iconița de căutare */}
          <button type="submit" className={css.Button}>
            <BiSearch size="20" />
          </button>

          {/* câmpul de introducere */}
          <input
            value={this.state.search}
            onChange={this.onChangeInput} // apelul funcției pentru modificarea stării
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
  }
}
