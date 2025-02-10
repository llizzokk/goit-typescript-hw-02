import styles from "./ImageCard.module.css";

import { IImageCardProps } from "./ImageCard.types";

const ImageCard: React.FC<IImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={styles.imageCardWrap}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageCard;
