import { IImage } from "../ImageCard/ImageCard.types";

export interface IImageGalleryProps {
  images: IImage[];
  onImageClick: (image: IImage) => void;
}
