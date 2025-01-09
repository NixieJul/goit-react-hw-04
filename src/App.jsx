import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "SeUFj1xwChL0ljimNj_TUMDvA_tBPYpz1OR8V4zFrMg";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
        });

        if (response.data.results.length === 0) {
          toast.error("Зображення не знайдено! Спробуйте інший запит.");
          setShowLoadMore(false);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
          setShowLoadMore(response.data.results.length >= 12);
        }
      } catch (err) {
        setError("Щось пішло не так. Спробуйте ще раз.");
        toast.error("Помилка завантаження!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {showLoadMore && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      <Toaster />
    </div>
  );
};

export default App;
