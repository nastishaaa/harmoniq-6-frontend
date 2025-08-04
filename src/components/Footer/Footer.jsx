import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/public/icons/footer-logo.svg" alt="Harmoniq logo" />
          </Link>
        </div>

        <div className={styles.copy}>© 2025 Harmoniq. All rights reserved.</div>

        <div className={styles.links}>
          <Link to="/articles" className={styles.link}>
            Articles
          </Link>
        </div>
      </div>
    </footer>
  );
}
