export interface IImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

export interface IAppState {
  query: string;
  images: IImage[];
  loading: boolean;
  error: boolean;
  page: number;
  totalPages: number;
  isModalOpen: boolean;
  selectedImage: IImage | null;
}

export type SearchHandle = (query: string) => void;

export type LoadMoreHandle = () => void;
