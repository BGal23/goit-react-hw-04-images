import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (searching === '') {
      return;
    }
    const fetchData = async () => {
      let searchingImages;

      try {
        setBtnMore(false);
        setIsLoading(true);
        setMessage('');
        searchingImages = await getAllItem(searching, pageNumber);
        setImages(prev => prev.concat(searchingImages));
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
    fetchData();
  }, [searching, pageNumber]);

  const searchItems = event => {
    event.preventDefault();
    const query = event.target[1].value;
    setSearching(query);
    setImages([]);
    setPageNumber(1);
  };

  const loadMore = () => {
    setImages([...images]);
    setSearching(searching);
    setPageNumber(prev => prev + 1);
  };

  const modalOpen = event => {
    setIsModalOpen(true);
    setModalImg(event.target.srcset);
  };

  const modalClose = event => {
    if (event.target.tagName === 'DIV' || event.code === 'Escape') {
      setIsModalOpen(false);
      setModalImg('');
    }
    window.removeEventListener('keydown', modalClose);
  };

  return (
    <>
      <SearchBar searchItems={searchItems} />
      <div className={css.app}>
        <ImageGallery>
          <ImageGalleryItem modalOpen={modalOpen} images={images} />
        </ImageGallery>
        {isLoading === true && <Loader />}
        {isModalOpen === true && (
          <Modal modalImg={modalImg} modalClose={modalClose} />
        )}
      </div>
      {message && <div className={css.message}>{message}</div>}
      {btnMore === true && <Button loadMore={loadMore} />}
    </>
  );
};

export default App;
