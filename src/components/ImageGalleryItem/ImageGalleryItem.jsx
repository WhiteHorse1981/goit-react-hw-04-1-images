import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ image }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
  };

  return (
    <>
      <li className={css.ImageGalleryItem} onClick={toggleModal}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={css.ImageGalleryItem_image}
        />
      </li>

      {isOpenModal ? (
        <Modal
          onCloseModal={toggleModal}
          srcImg={image.largeImageURL}
          altImg={image.tags}
        />
      ) : null}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: propTypes.object.isRequired,
};
