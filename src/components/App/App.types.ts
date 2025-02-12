export interface IImage extends Record<string, any> {
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

export type SearchHandle = (query: string) => void;

export type LoadMoreHandle = () => void;
