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

export interface IImageCardProps {
  image: IImage;
  onClick: () => void;
}
