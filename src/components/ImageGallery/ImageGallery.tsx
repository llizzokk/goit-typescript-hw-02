import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

import { IImageGalleryProps } from "./ImageGallery.types";

const ImageGallery: React.FC<IImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={styles.imageList}>
      {images.map((image) => (
        <li key={image.id} className={styles.imageCard}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
