import { FC } from "react";
import styles from "./loader.module.css";

const Loader: FC<{ size: number; extraStyle: any }> = ({
  size,
  extraStyle,
}) => {
  return (
    <div
      className={styles.loader}
      style={{ height: size + "px", width: size + "px", ...extraStyle }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
