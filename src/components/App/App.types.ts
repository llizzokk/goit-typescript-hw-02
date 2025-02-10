export interface IAppImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
}

export interface IAppState {
  query: string;
  images: IAppImage[];
  loading: boolean;
  error: boolean;
  page: number;
  totalPages: number;
  isModalOpen: boolean;
  selectedImage: IAppImage | null;
}

export type SearchHandle = (query: string) => void;

export type LoadMoreHandle = () => void;
