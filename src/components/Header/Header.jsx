import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

import BurgerOpen from "/src/assets/icons/burger.svg";
import BurgerClose from "/src/assets/icons/close.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/">
              <img
                src="/src/assets/icons/header-logo.svg"
                alt="Harmoniq logo"
              />
            </Link>
          </div>

          <nav className={styles.navDesktop}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
              <li>
                <Link to="/users">Creators</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register" className={styles.joinNow}>
                  Join Now
                </Link>
              </li>
            </ul>
          </nav>

          <Link to="/register" className={styles.joinNowTablet}>
            Join Now
          </Link>
          <button
            className={styles.burger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={isOpen ? BurgerClose : BurgerOpen}
              alt={isOpen ? "Close menu" : "Open menu"}
              className={styles.burgerIcon}
            />
          </button>
        </div>
      </header>
      <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/articles" onClick={() => setIsOpen(false)}>
                Articles
              </Link>
            </li>
            <li>
              <Link to="/users" onClick={() => setIsOpen(false)}>
                Creators
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Log In
              </Link>
            </li>
            <li className={styles.joinNowMobile}>
              <Link
                to="/register"
                className={styles.joinNow}
                onClick={() => setIsOpen(false)}
              >
                Join Now
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
