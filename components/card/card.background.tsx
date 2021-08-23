import React, { ReactNode } from "react";
import styles from "../../styles/card.module.css";

export interface CardBackgroundProps {
  imageURL?: string;
  children?: ReactNode;
}

const CardBackground: React.FC<CardBackgroundProps> = ({ imageURL, children }) => (
  <div className={styles.background} style={{ backgroundImage: `url(${imageURL})` }}>
    {children}
  </div>
);

export default CardBackground;