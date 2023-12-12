import PropTypes from 'prop-types';
import css from './modal.module.css';

const Modal = ({ modalImg, modalAlt, modalClose }) => {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.props.modalClose);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.props.modalClose);
  // }

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
