import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Показати ще
    </button>
  );
};

export default LoadMoreBtn;
