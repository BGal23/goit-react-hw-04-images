import { useState } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import SearchBar from './SearchBar/SearchBar';
import getAllItem from './importAPI';
import css from './app.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [searching, setSearching] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [btnMore, setBtnMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('false');
  const [alt, setAlt] = useState('');

  const searchItems = async event => {
    event.preventDefault();
    const query = event.target[1].value;
    let searchingImages;

    try {
      setImages([]);
      setSearching(query);
      setPageNumber(1);
      setBtnMore(false);
      setIsLoading(true);
      setMessage('');
      searchingImages = await getAllItem(query, pageNumber);
      setImages([...searchingImages]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      if (searchingImages.length > 11) {
        setBtnMore(true);
      } else {
        setBtnMore(false);
        setMessage("Sorry, that's all we found.");
      }
    }
  };

  const modalOpen = event => {
    setIsModalOpen(true);
    setModalImg(event.target.srcset);
    setAlt(event.target.alt);
  };

  const modalClose = event => {
    if (event.target.tagName === 'DIV' || event.code === 'Escape') {
      setIsModalOpen(false);
      setModalImg('');
      setAlt('');
    }
    window.removeEventListener('keydown', modalClose);
  };

  const loadMore = async () => {
    const allImages = images.length;
    let searchingImages;
    try {
      setPageNumber(prev => prev + 1);
      setBtnMore(false);
      setIsLoading(true);
      setMessage('');
      searchingImages = await getAllItem(searching, pageNumber);
      setImages([...images, ...searchingImages]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      if (searchingImages.length + images.length > allImages + 11) {
        setBtnMore(true);
      } else {
        setBtnMore(false);
        setMessage("Sorry, that's all we found.");
      }
    }
  };

  return (
    <>
      <SearchBar searchItems={searchItems} />
      <div className={css.app}>
        {isLoading === true ? (
          <Loader />
        ) : (
          <ImageGallery>
            <ImageGalleryItem modalOpen={modalOpen} images={images} />
          </ImageGallery>
        )}
        {isModalOpen === true && (
          <Modal modalImg={modalImg} modalAlt={alt} modalClose={modalClose} />
        )}
      </div>
      {message && <div className={css.message}>{message}</div>}
      {btnMore === true && <Button loadMore={loadMore} />}
    </>
  );
};

export default App;
