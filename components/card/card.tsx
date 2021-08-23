import React, { ReactNode } from "react";
import styles from "../../styles/card.module.css";
import CardBackground, { CardBackgroundProps } from "./card.background";

interface StaticCard {
  Background: React.FC<CardBackgroundProps>;
}

export interface CardProps {
  children?: ReactNode;
}

const Card: React.FC<CardProps> & StaticCard = ({ children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

Card.Background = CardBackground;

export default Card;
