import { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { fetchImages } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    async function getImages() {
      try {
        setLoading(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      <div className="wrapper">
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {images && images.length > 0 && (
          <ImageGallery images={images} onImageClick={handleImageClick} />
        )}
        {images && images.length > 0 && page < totalPages && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
        {selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            image={selectedImage}
            onClose={handleModalClose}
          />
        )}
      </div>
    </>
  );
}

export default App;
