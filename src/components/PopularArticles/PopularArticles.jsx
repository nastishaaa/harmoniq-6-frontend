import React from 'react';
import { useSelector } from 'react-redux';
import { selectHomeArticles } from '../../redux/homeData/selectors';
import styles from './PopularArticles.module.css';
import { Link } from 'react-router-dom';
import ArticlesItem from '../ArticlesItem/ArticlesItem';

const PopularArticles = () => {
    const homeArticles = useSelector(selectHomeArticles);
  return (
      <section className={styles.popularArticles}>
          <div className={styles.popularArticlesTitleAndLink}>
              <h2 className={styles.popularArticlesTitle}>Popular Articles</h2>
              <Link to="/articles" className={styles.popularArticlesLink}>
                  <p className={styles.popularArticlesLinkText}>Go to all Articles</p>
                  <svg
                        className={styles.popularArticlesLinkIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="41"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none">
                        <path
                        d="M13.375 27.125L27.6195 12.875M27.6195 12.875H19.948M27.6195 12.875L27.6196 20.5466"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                </Link>
          </div>
          <ul className={styles.popularArticlesList}>
              {homeArticles.map((homeArticle) => {
                    return (
                        <li className={styles.popularArticlesItem} key={homeArticle._id}>
                            <ArticlesItem article={homeArticle} id={homeArticle._id} />
                        </li>
                    )
              })}
            </ul>
    </section>
  )
}

export default PopularArticles