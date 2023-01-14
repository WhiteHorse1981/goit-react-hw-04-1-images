import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal');

export const Modal = ({ onCloseModal, srcImg, altImg }) => {
  useEffect(() => {
    // console.log('mount');
    window.addEventListener('keydown', handleCloseModalEsc);

    return () => {
      // console.log('unmount');
      window.removeEventListener('keydown', handleCloseModalEsc);
    };
  });

  const handleCloseModalEsc = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  const jsx = (
    <>
      <div className={css.Overlay} onClick={handleBackdropClick}>
        <div className={css.Modal}>
          <img src={srcImg} alt={altImg} />
          <p className={css.imgAlt}>{altImg}</p>
        </div>
      </div>
    </>
  );
  return createPortal(jsx, modalRoot);
};

Modal.propTypes = {
  srcImg: propTypes.string.isRequired,
  altImg: propTypes.string.isRequired,
  onCloseModal: propTypes.func.isRequired,
};
