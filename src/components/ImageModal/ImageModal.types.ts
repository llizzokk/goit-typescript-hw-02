import { IImage } from "../App/App.types";

export interface IImageModalProps {
  isOpen: boolean;
  image: IImage;
  onClose: () => void;
}
