import React from "react";
import styles from "../styles/layout.module.css";

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.content}>
        <h1>Smite</h1>
      </div>
    </div>
    <main className={styles.main}>
      <div className={styles.content}>
        {children}
      </div>
    </main>
    <footer className={styles.footer}>
      <div className={styles.content}>
        Hayden Phothong &copy; 2021
      </div>
    </footer>
  </div>
);

export default Layout;
