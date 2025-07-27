import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Harmoniq logo" />
        </div>

        <div className={styles.links}>
          <Link to="/articles">Articles</Link>
        </div>

        <div className={styles.copy}>© 2025 Harmoniq. All rights reserved.</div>
      </div>
    </footer>
  );
}
