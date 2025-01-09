import { TailSpin } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <TailSpin height="50" width="50" color="#4fa94d" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
