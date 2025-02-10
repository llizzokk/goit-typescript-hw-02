import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={styles.error}>Something went wrong! Please try again.</div>
  );
};

export default ErrorMessage;
