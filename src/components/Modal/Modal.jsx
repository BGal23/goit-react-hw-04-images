import PropTypes from 'prop-types';
import css from './modal.module.css';
import { useEffect } from 'react';

const Modal = ({ modalImg, modalAlt, modalClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', modalClose);
  }, []);

  return (
    <div onClick={modalClose} className={css.overlay}>
      <div className={css.modal}>
        <img src={modalImg} alt={modalAlt} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  modalImg: PropTypes.string,
  modalAlt: PropTypes.string,
  modalClose: PropTypes.func,
};
