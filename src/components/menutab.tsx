import { FC } from "react";
import styles from "./menutab.module.css";

const MenuTab: FC<{
  title: string;
  description: string;
  onClick: () => void;
  selected: boolean;
}> = ({ title, description, onClick, selected }) => {
  return (
    <div
      className={styles.menutab + " " + (selected ? styles.selectedtab : "")}
      onClick={onClick}
    >
      <div className={styles.tabtitle}>{title}</div>
      <div className={styles.tabsubtitle}>{description}</div>
    </div>
  );
};

export default MenuTab;
