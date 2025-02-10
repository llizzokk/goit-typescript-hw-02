import styles from "./ImageModal.module.css";
import Modal from "react-modal";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect } from "react";

import { IImageModalProps } from "./ImageModal.types";

Modal.setAppElement("#root");

const ImageModal: React.FC<IImageModalProps> = ({ isOpen, image, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className={styles.modalWrap}>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={styles.modalImage}
        />
        <div className={styles.modalTextWrap}>
          <p className={styles.modalText}>
            <FaUser />
            {image.user.name}
          </p>
          <p className={styles.modalText}>
            <FaHeart />
            {image.likes}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
