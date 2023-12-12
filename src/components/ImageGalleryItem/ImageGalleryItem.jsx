import PropTypes from 'prop-types';
import css from './image-gallery-item.module.css';

const ImageGalleryItem = ({ images, modalOpen }) => {
  const imagesList = images.map(item => (
    <div onClick={modalOpen} className={css.item} key={item.id}>
      <img
        srcSet={item.largeImageURL}
        className={css.image}
        src={item.webformatURL}
        alt={item.tags}
      />
    </div>
  ));
  return <>{imagesList}</>;
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  modalOpen: PropTypes.func,
};
