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

import { IAppState, SearchHandle, LoadMoreHandle, IImage } from "./App.types";

function App() {
  const [state, setState] = useState<IAppState>({
    query: "",
    images: [],
    loading: false,
    error: false,
    page: 1,
    totalPages: 0,
    isModalOpen: false,
    selectedImage: null,
  });

  useEffect(() => {
    if (!state.query) return;
    async function getImages() {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const data = await fetchImages(state.query, state.page);
        setState((prev) => ({
          ...prev,
          images:
            state.page === 1
              ? (data.results as IImage[])
              : [...prev.images, ...(data.results as IImage[])],
          totalPages: data.total_pages,
        }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: true }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }

    getImages();
  }, [state.query, state.page]);

  const handleSearch: SearchHandle = (query) => {
    setState({ ...state, query, page: 1 });
  };

  const handleLoadMore: LoadMoreHandle = () => {
    if (state.page < state.totalPages) {
      setState((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleImageClick = (image: IImage) => {
    if (!state.isModalOpen) {
      setState((prev) => ({
        ...prev,
        selectedImage: image,
        isModalOpen: true,
      }));
    }
  };

  const handleModalClose = () => {
    setState((prev) => ({ ...prev, selectedImage: null, isModalOpen: false }));
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      <div className="wrapper">
        {state.loading && <Loader />}
        {state.error && <ErrorMessage />}
        {state.images && state.images.length > 0 && (
          <ImageGallery images={state.images} onImageClick={handleImageClick} />
        )}
        {state.images &&
          state.images.length > 0 &&
          state.page < state.totalPages && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        {state.selectedImage && (
          <ImageModal
            isOpen={state.isModalOpen}
            image={state.selectedImage}
            onClose={handleModalClose}
          />
        )}
      </div>
    </>
  );
}

export default App;
