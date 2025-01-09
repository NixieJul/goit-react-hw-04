import Modal from "react-modal";
import styles from "./ImageModal.module.css";

const ImageModal = ({ src, alt, author, onClose }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <button onClick={onClose} className={styles.closeButton}>
        ×
      </button>
      <img src={src} alt={alt} className={styles.image} />
      <p className={styles.author}>Автор: {author}</p>
    </Modal>
  );
};

export default ImageModal;
