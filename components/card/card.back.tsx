import React, { ReactNode } from "react";
import styles from "../../styles/card.module.css";

export interface CardBackProps {
  children?: ReactNode;
}

const CardBack: React.FC<CardBackProps> = ({children}) => {
  return (
    <div className={styles.back}>
      {children}
    </div>
  );
}

export default CardBack;
