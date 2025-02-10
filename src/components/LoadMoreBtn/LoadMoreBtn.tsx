import styles from "./LoadMoreBtn.module.css";
import { ILoadMoreBtnProps } from "./LoadMoreBtn.types";

const LoadMoreBtn: React.FC<ILoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.buttonLoad}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
