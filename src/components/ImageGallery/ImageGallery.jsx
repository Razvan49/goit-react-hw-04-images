import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'; // elementul galeriei
import PropTypes from 'prop-types'; // tipizarea proprietăților
import css from './ImageGallery.module.css'; // importăm stilurile

// Componenta funcțională care gestionează galeria de imagini.
export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <>
      <ul className={css.gallery}>
        <ImageGalleryItem toggleModal={toggleModal} images={images} />
      </ul>
    </>
  );
};

// tipizarea proprietăților
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired, // array de obiecte
  toggleModal: PropTypes.func.isRequired, // funcție
};
