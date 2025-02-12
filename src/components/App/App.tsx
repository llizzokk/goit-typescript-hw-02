import { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { fetchImages } from "../../services/api";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";

import { SearchHandle, LoadMoreHandle, IImage } from "./App.types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);

  useEffect(() => {
    if (!query) return;
    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(query, page);
        setImages((prevImages) =>
          page === 1
            ? (data.results as IImage[])
            : [...prevImages, ...(data.results as IImage[])]
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

  const handleSearch: SearchHandle = (query) => {
    setQuery(query);
    setPage(1);
    setTotalPages(0);
  };

  const handleLoadMore: LoadMoreHandle = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleImageClick = (image: IImage) => {
    if (!isModalOpen) {
      setSelectedImage(image);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
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
