import { IImage } from "../ImageCard/ImageCard.types";

export interface IImageModalProps {
  isOpen: boolean;
  image: IImage;
  onClose: () => void;
}
