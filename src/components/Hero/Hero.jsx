import React from 'react';
import styles from "./Hero.module.css";
import heroMobile from './images/hero-mobile.png';
import heroMobile2x from './images/hero-mobile@2x.png';
import heroTablet from './images/hero-tablet.png';
import heroTablet2x from './images/hero-tablet@2x.png';
import heroDesktop from './images/hero-desktop.png';
import heroDesktop2x from './images/hero-desktop@2x.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
      <section className={styles.hero}>
              <img
                  className={styles.heroPhoto}
                  srcSet={`
                    ${heroMobile} 361w,
                    ${heroMobile2x} 722w,
                    ${heroTablet} 430w,
                    ${heroTablet2x} 860w,
                    ${heroDesktop} 806w,
                    ${heroDesktop2x} 1612w
                `}
                  sizes="
                  (min-width: 1440px) 806px,
                  (min-width: 768px) 430px,
                  (max-width: 767px) 361px
                  "
                  src={heroMobile}
                  alt="Girl relaxed in the mountains"
              />
              <div className={styles.heroTitleAndBtns}>
                <h1 className={styles.heroTitle}>
                    Find your <span className={styles.heroTitleSpan}>harmony</span> in community
                </h1>
                <div className={styles.heroBtns}>
                    <a href='#home-articles' className={styles.heroGoToBtn}>Go to Articles</a>
                    <Link to="/register" className={styles.heroRegisterBtn}>Register</Link>
                </div>
              </div>
      </section>
  )
}

export default Hero