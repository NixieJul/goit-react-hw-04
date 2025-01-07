import { useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ data, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.id === "modalOverlay") onClose();
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      id="modalOverlay"
      onClick={handleClickOutside}
    >
      <img
        src={data.urls.regular}
        alt={data.alt_description}
        className={styles.image}
      />
      <p className={styles.description}>Author: {data.user.name}</p>
    </ReactModal>
  );
};

export default ImageModal;
