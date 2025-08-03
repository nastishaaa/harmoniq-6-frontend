import React from "react";
import { useSelector } from "react-redux";
import { selectTopCreators } from "../../redux/homeData/selectors";
import styles from "./TopCreators.module.css";
import { Link } from "react-router-dom";
import AuthorsItem from "../AuthorsItem/AuthorsItem";

const TopCreators = () => {
  const topCreators = useSelector(selectTopCreators);
  return (
    <section className={styles.topCreators}>
      <div className={styles.topCreatorsTitleAndLink}>
        <h2 className={styles.topCreatorsTitle}>Top Creators</h2>
        <Link to="/users" className={styles.topCreatorsLink}>
          <p className={styles.topCreatorsLinkText}>Go to all Creators</p>
          <svg
            className={styles.topCreatorsLinkIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
          >
            <path
              d="M13.375 27.125L27.6195 12.875M27.6195 12.875H19.948M27.6195 12.875L27.6196 20.5466"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <ul className={styles.topCreatorsList}>
        {topCreators.map((author, index) => (
          <AuthorsItem key={index} author={author} isShowOlyName={true} />
        ))}
      </ul>
    </section>
  );
};

export default TopCreators;
