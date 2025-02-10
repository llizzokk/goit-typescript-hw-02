export interface IImage {
  id: string;
  user: {
    name: string;
  };
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
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
