import { IImage } from "../App/App.types";

export interface IImageGalleryProps {
  images: IImage[];
  onImageClick: (image: IImage) => void;
}
