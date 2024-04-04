import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast'; // pentru afișarea mesajelor pop-up
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearch } from 'api/getSearch'; // pentru obținerea datelor de căutare
import { Searchbar } from './Searchbar/Searchbar'; // bara de căutare
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader'; // indicator de încărcare
import { Modal } from './Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false); // indicator pentru încărcare
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [empty, setEmpty] = useState(false); // indicator pentru rezultatele căutării goale

  useEffect(() => {
    // Verificăm dacă s-au modificat proprietățile search sau page.
    if (search !== '' && (page === 1 || page !== 1)) {
      setLoading(true); // activăm indicatorul de încărcare

      // Apelăm funcția getSearch, care face cererea către server.
      getSearch(search, page)
        .then(resp => resp.json()) // convertim în JSON
        .then(data => {
          // Verificăm dacă rezultatele căutării sunt goale.
          if (data.hits.length === 0) {
            setEmpty(true); // activăm indicatorul care arată că rezultatele căutării sunt goale
          }
          setImages(prevImages => [...prevImages, ...data.hits]); // adăugăm imaginile noi la array
          setTotal(data.total);
        })
        .catch(error => {
          setError(error.message); // înregistrăm eroarea în state
        })
        .finally(() => {
          setLoading(false); // dezactivăm indicatorul de încărcare
        });
    }
  }, [search, page]);

  // Funcția apelată la apăsarea butonului "Load more".
  const clickLoad = () => {
    setPage(prevPage => prevPage + 1); // incrementăm numărul paginii cu 1
  };

  // Funcția apelată la apăsarea imaginii.
  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setModalImage({ largeImageURL, alt });
  };

  // Funcția apelată la apăsarea butonului "Search".
  const handleSubmit = search => {
    // Curățăm array-ul de imagini, și stabilim valorile inițiale pentru pagina,
    // totalul imaginilor, indicatorii și erori.
    setSearch(search);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
  };

  // Funcția apelată la închiderea modalului.
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Mesajele pop-up */}
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />

      {/* bara de căutare */}
      <Searchbar handleSubmit={handleSubmit} />

      {/* Verificăm dacă există eroare */}
      {error && (
        <h2 style={{ textAlign: 'center' }}>
          Something went wrong: ({error})!
        </h2>
      )}

      {/* afișarea listei de imagini */}
      <ImageGallery toggleModal={openModal} images={images} />

      {/* Verificăm dacă are loc încărcarea */}
      {loading && <Loader />}

      {/* Verificăm dacă rezultatele căutării sunt goale */}
      {empty && (
        <h2 style={{ textAlign: 'center' }}>
          Sorry. There are no images ... 😭
        </h2>
      )}

      {/* Verificăm dacă trebuie afișat butonul "Load more" */}
      {total / 12 > page && <Button clickLoad={clickLoad} />}

      {/* Verificăm dacă trebuie afișat modulul */}
      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={modalImage.largeImageURL} alt={modalImage.alt} />
        </Modal>
      )}
    </div>
  );
};
