import { Component } from 'react';
import { Toaster } from 'react-hot-toast'; // pentru afișarea mesajelor pop-up
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearch } from 'api/getSearch'; // pentru obținerea datelor de căutare
import { Searchbar } from './Searchbar/Searchbar'; // bara de căutare
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader'; // indicator de încărcare
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 1,
    loading: false, // indicator pentru încărcare
    error: null,
    showModal: false,
    empty: false, // indicator pentru rezultatele căutării goale
  };

  componentDidUpdate(_, PrevState) {
    // Verificăm dacă s-au modificat proprietățile search sau page.
    if (
      PrevState.search !== this.state.search ||
      PrevState.page !== this.state.page
    ) {
      this.getFunc(this.state.search, this.state.page);
    }
  }

  getFunc = (text, page) => {
    this.setState({ loading: true }); // activăm indicatorul de încărcare

    // Apelăm funcția getSearch, care face cererea către server.
    getSearch(text, page)
      .then(resp => resp.json()) // convertim în JSON
      .then(data => {
        // Verificăm dacă rezultatele căutării sunt goale.
        if (data.hits.length === 0) {
          this.setState({ empty: true }); // activăm indicatorul care arată că rezultatele căutării sunt goale
        }
        this.setState(prevSt => ({
          page: prevSt.page,
          images: [...prevSt.images, ...data.hits], // adăugăm imaginile noi la array
          total: data.total,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message }); // înregistrăm eroarea în state
      })
      .finally(() => {
        this.setState({ loading: false }); // dezactivăm indicatorul de încărcare
      });
  };

  // Funcția apelată la apăsarea butonului "Load more".
  clickLoad = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1, // incrementăm numărul paginii cu 1
    }));
  };

  // Funcția apelată la apăsarea imaginii.
  openModal = (largeImageURL, alt) => {
    // Folosim setState cu o funcție care primește starea precedentă și returnează una nouă.
    this.setState(({ showModal }) => {
      return { showModal: !showModal, largeImageURL, alt };
    });
  };

  // Funcția apelată la apăsarea butonului "Search".
  handleSubmit = search => {
    // Curățăm array-ul de imagini, și stabilim valorile inițiale pentru pagina,
    // totalul imaginilor, indicatorii și erori.
    this.setState({
      search,
      images: [],
      page: 1,
      total: 1,
      loading: false,
      error: null,
      empty: false,
    });
  };

  // Funcția apelată la apăsarea butonului "Close".
  closeModal = () => {
    // Folosim setState cu o funcție care primește starea precedentă și returnează una nouă.
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  render() {
    const { error, loading, images, total, page } = this.state;
    return (
      <div>
        {/* Mesajele pop-up */}
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />

        {/* bara de căutare */}
        <Searchbar handleSubmit={this.handleSubmit} />

        {/* Verificăm dacă există eroare */}
        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Something went wrong: ({error})!
          </h2>
        )}

        {/* afișarea listei de imagini */}
        <ImageGallery togleModal={this.openModal} images={images} />

        {/* Verificăm dacă are loc încărcarea */}
        {loading && <Loader />}

        {/* Verificăm dacă rezultatele căutării sunt goale */}
        {this.state.empty && (
          <h2 style={{ textAlign: 'center' }}>
            Sorry. There are no images ... 😭
          </h2>
        )}

        {/* Verificăm dacă trebuie afișat butonul "Load more" */}
        {total / 12 > page && <Button clickLoad={this.clickLoad} />}

        {/* Verificăm dacă trebuie afișat modulul */}
        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
      </div>
    );
  }
}
