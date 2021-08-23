import React, { ReactNode } from "react";
import styles from "../../styles/card.module.css";

export interface CardFrontProps {
  children?: ReactNode;
}

const CardFront: React.FC<CardFrontProps> = ({children}) => (
  <div className={styles.front}>
    {children}
  </div>
);

export default CardFront;
