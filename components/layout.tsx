import React from "react";
import styles from "../styles/layout.module.css";

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h1>Smite</h1>
    </div>
    <main className={styles.main}>
      {children}
    </main>
    <footer className={styles.footer}>Hayden Phothong &copy; 2021</footer>
  </div>
);

export default Layout;
