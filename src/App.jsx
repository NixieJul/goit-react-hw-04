import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import fetchImages from "./services/api";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const newImages = await fetchImages(query, page);
        setImages((prev) => [...prev, ...newImages]);
      } catch (error) {
        setError("Error fetching images. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [query, page]);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const loadMore = () => setPage((prev) => prev + 1);

  const openModal = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMore} />}
      {showModal && <ImageModal data={modalData} onClose={closeModal} />}
    </div>
  );
};

export default App;
