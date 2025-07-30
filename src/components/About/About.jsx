import React from 'react';
import classNames from "./About.module.css";

import flowerMobile from './images/about-flower-mobile.png';
import flowerMobile2x from './images/about-flower-mobile@2x.png';
import flowerTablet from './images/about-flower-tablet.png';
import flowerTablet2x from './images/about-flower-tablet@2x.png';
import flowerDesktop from './images/about-flower-desktop.png';
import flowerDesktop2x from './images/about-flower-desktop@2x.png';

import joyMobile from './images/about-joy-mobile.png';
import joyMobile2x from './images/about-joy-mobile@2x.png';
import joyTablet from './images/about-joy-tablet.png';
import joyTablet2x from './images/about-joy-tablet@2x.png';
import joyDesktop from './images/about-joy-desktop.png';
import joyDesktop2x from './images/about-joy-desktop@2x.png';

import meditationDesktop from './images/about-meditation-desktop.png';
import meditationDesktop2x from './images/about-meditation-desktop@2x.png';

const About = () => {
  return (
      <section className={classNames.about}>
          <div className={classNames.aboutUsAndFlowerImg}>
              <div className={classNames.aboutUs}>
                  <h2 className={classNames.aboutUsTitle}>About us</h2>
                  <p className={classNames.aboutUsDescr}>
                      Harmoniq is a mindful publishing platform dedicated to mental health and well-being. We bring together writers, thinkers, and readers who believe that open, thoughtful stories can heal, inspire, and connect. Whether you're here to share your journey or learn from others — this is your space to  slow down, reflect, and grow.
                  </p>
              </div>
              <img
                  className={classNames.aboutFlowerImg}
                  srcSet={`
                    ${flowerMobile} 361w,
                    ${flowerMobile2x} 722w,
                    ${flowerTablet} 249w,
                    ${flowerTablet2x} 498w,
                    ${flowerDesktop} 704w,
                    ${flowerDesktop2x} 1408w
                `}
                  sizes="
                  (min-width: 1440px) 704px,
                  (min-width: 768px) 249px,
                  (max-width: 767px) 361px
                  "
                  src={flowerMobile}
                  alt="Flower illustration"
              />
          </div>
          <div className={classNames.aboutJoyImgAndMeditationImg}>
              <img
                  className={classNames.aboutJoyImg}
                  srcSet={`
                    ${joyMobile} 361w,
                    ${joyMobile2x} 722w,
                    ${joyTablet} 704w,
                    ${joyTablet2x} 1408w,
                    ${joyDesktop} 808w,
                    ${joyDesktop2x} 1616w
                `}
                  sizes="
                  (min-width: 1440px) 808px,
                  (min-width: 768px) 704px,
                  (max-width: 767px) 361px
                  "
                  src={flowerMobile}
                  alt="Joy group illustration"
              />
              <img
                  className={classNames.aboutMeditationImg}
                  srcSet={`
                    ${meditationDesktop} 392w,
                    ${meditationDesktop2x} 784w
                `}
                  sizes="
                  (min-width: 1440px) 392px,
                  "
                  src={flowerMobile}
                  alt="Meditation person illustration"
              />
            </div>
    </section>
  )
}

export default About