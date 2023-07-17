import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/components/settings-bar.module.css";

const SettingsBar: React.FC = () => {
  const onClickFilter = () => alert("clicked filter");
  return (
    <div className={styles.settingsBar}>
      <FontAwesomeIcon
        icon={faCog}
        onClick={onClickFilter}
        className={styles.settingsIcon}
      />
    </div>
  );
};

export default SettingsBar;
