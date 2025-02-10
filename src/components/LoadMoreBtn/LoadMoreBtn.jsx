import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.buttonLoad}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
