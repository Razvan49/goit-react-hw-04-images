import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

// Componenta funcțională care gestionează elementul din galerie
export const ImageGalleryItem = ({ images, toggleModal }) => {
  // Eliminăm duplicatele bazate pe id
  const uniqueImages = images.filter(
    (item, index, self) => index === self.findIndex(t => t.id === item.id)
  );
  return (
    <>
      {/* Parcurgem array-ul de imagini unice și le afișăm pe pagină. */}
      {uniqueImages.map(item => (
        // La clic pe elementul din galerie, apelăm funcția toggleModal care deschide fereastra modală.
        <li
          key={item.id}
          onClick={() => {
            toggleModal(item.largeImageURL, item.tags);
          }}
          className={css.galleryItem}
        >
          <img
            loading="lazy"
            className={css.ImageGalleryItem}
            src={item.webformatURL}
            alt={item.tags}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired, // array de obiecte
};
