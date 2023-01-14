import css from '../components/App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { RequestFailed } from './RequestFailed/RequestFailed';
import { getImages } from './Api/fetchImages';
import { useState, useEffect } from 'react';

const FETCH_STATUS = {
  Idle: 'idle',
  Pending: 'pending',
  Resolved: 'resolved',
  Rejected: 'rejected',
};

export const App = () => {
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState(FETCH_STATUS.Idle);
  const [submitQuery, setSubmitQuery] = useState('');
  const [page, setPage] = useState(1);
  const [requestedPictures] = useState(12);
  const [uploadedPicturesAmount, setUploadedPicturesAmount] = useState(null);

  useEffect(() => {
    if (submitQuery === '') {
      return;
    }
    const fetchGallery = async () => {
      setStatus(FETCH_STATUS.Pending);

      try {
        const data = await getImages(page, submitQuery, requestedPictures);
        if (data.hits.length === 0) {
          setStatus(FETCH_STATUS.Rejected);
          return;
        }
        setImages(page > 1 ? [...images, ...data.hits] : data.hits);
        setPage(page);
        setStatus(FETCH_STATUS.Resolved);
        setUploadedPicturesAmount(data.hits.length);
      } catch (error) {
        setStatus(FETCH_STATUS.Rejected);
      }
    };
    fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, submitQuery]);

  const handleSubmit = inputQuery => {
    setPage(1);
    setSubmitQuery(inputQuery);
    // setImages([]);
  };

  const hendleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />

      {status === FETCH_STATUS.Rejected && <RequestFailed />}

      {(status === FETCH_STATUS.Resolved || page > 1) && (
        <ImageGallery images={images} />
      )}
      {status === FETCH_STATUS.Pending && <Loader />}
      {uploadedPicturesAmount >= requestedPictures &&
        status === FETCH_STATUS.Resolved && (
          <Button onLoadImg={hendleLoadMore} />
        )}
    </div>
  );
};
