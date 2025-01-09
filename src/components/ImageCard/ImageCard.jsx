import { useState } from "react";
import ImageModal from "../ImageModal/ImageModal";
import styles from "./ImageCard.module.css";

const ImageCard = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
        onClick={toggleModal}
      />
      {isModalOpen && (
        <ImageModal
          src={image.urls.regular}
          alt={image.alt_description}
          author={image.user.name}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default ImageCard;
