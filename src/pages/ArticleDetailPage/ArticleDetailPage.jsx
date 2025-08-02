import styles from "./ArticleDetailPage.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  selectArticles,
  selectSelectedArticle,
  selectErrorArticle,
  selectLoadingArticle,
} from "../../redux/articles/selectors";
import { Loader } from "../../components/Loader/Loader";
import ButtonAddToBookmarks from "../../components/ButtonAddToBookmarks/ButtonAddToBookmarks";

import {
  fetchArticleById,
  fetchArticles,
} from "../../redux/articles/operations";

function formatDate(dateString) {
  if (!dateString) {
    return "XX.XX.XXXX";
  }
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export default function ArticleDetailPage() {
  const { id: articleId } = useParams();
  const articles = useSelector(selectArticles);
  const article = useSelector(selectSelectedArticle);
  const isLoadingArticle = useSelector(selectLoadingArticle);
  const isErrorArticle = useSelector(selectErrorArticle);

   const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(fetchArticleById(articleId));
    dispatch(fetchArticles());
  }, [dispatch, articleId]);

  const related = articles
    .filter(({ _id }) => String(_id) !== String(articleId))
    .slice(0, 3);

  return (
    <>
      {isLoadingArticle && <Loader />}

      {article && (
        <div className={styles.section}>
          <h2 className={styles.title}>{article.title}</h2>
          <img
            src={article.img}
            alt={article.title}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.wrapper}>
            <div
              className={styles.articleTextWrapper}
              dangerouslySetInnerHTML={{
                __html: article?.article
                  ? article.article.replace(/\n/g, "<br /><br />")
                  : "",
              }}
            />
            <div className={styles.sidebarWithAction}>
              <aside className={styles.sidebar}>
                <h3>
                  Author:{" "}
                  <Link to={`/authors/${article.ownerId}`}>
                    <span className={styles.author}>
                      {article.author ?? "Author"}
                    </span>
                  </Link>
                </h3>
                <h3>
                  Publication date: <span>{formatDate(article.date)}</span>
                </h3>
                <h4>You can also interested</h4>
                <ul className={styles.listItem}>
                  {related.map((el) => (
                    <li key={el._id} className={styles.item}>
                      <div className={styles.anotherArticleContainer}>
                        <h5>{el.title}</h5>
                        <Link
                          to={`/articles/${el._id}`}
                          className={styles.anotherArticleLink}
                          aria-label={`Read article: ${el.title}`}
                        >
                          <svg
                            className={styles.arrowIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="41"
                            height="40"
                            viewBox="0 0 41 40"
                            fill="none"
                          >
                            <rect
                              x="1"
                              y="0.5"
                              width="39"
                              height="39"
                              rx="19.5"
                              stroke="currentColor"
                            />
                            <path
                              d="M13.375 27.125L27.6195 12.875M27.6195 12.875H19.948M27.6195 12.875L27.6196 20.5466"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                      <Link
                        to={`authors/${el.ownerId}`}
                        className={styles.ownerTitle}
                      >
                        {el.author ?? "Author"}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
              <div className={styles.btnSave}>
                 <ButtonAddToBookmarks articleId={articleId}>
                  Save
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 41 40"
                    fill="none"
                    className={styles.bookmarkIcon}
                  >
                    <rect
                      x="1"
                      y="0.5"
                      width="39"
                      height="39"
                      rx="19.5"
                      stroke="#374F42"
                    />
                    <path
                      d="M20.4971 11.5C21.7607 11.5 22.9206 11.6209 23.8398 11.7607C25.0036 11.9378 25.916 12.7353 26.1758 13.8496C26.4894 15.1948 26.7969 17.2414 26.7441 19.9902C26.6859 23.0233 26.2432 25.2117 25.8164 26.6396C25.701 27.0256 25.4339 27.2243 25.1318 27.2754C24.816 27.3287 24.4263 27.2236 24.1094 26.9082C23.5326 26.334 22.8719 25.7138 22.2627 25.2344C21.9586 24.9951 21.6558 24.7817 21.375 24.626C21.1101 24.4791 20.7995 24.3457 20.4971 24.3457C20.1993 24.3457 19.8783 24.4769 19.5977 24.6211C19.2986 24.7747 18.9675 24.9855 18.6289 25.2246C17.9504 25.7037 17.1989 26.3244 16.5371 26.8994C16.1878 27.2029 15.7764 27.2747 15.4521 27.1865C15.1392 27.1013 14.8752 26.8609 14.7939 26.4424C14.5149 25.0044 14.25 22.8805 14.25 20C14.25 17.1265 14.5461 15.0997 14.8408 13.7949C15.085 12.7136 15.9671 11.9437 17.1016 11.7686C18.0289 11.6253 19.2091 11.5 20.4971 11.5Z"
                      stroke="#374F42"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonAddToBookmarks>
              </div>
            </div>
          </div>
        </div>
      )}
      {isErrorArticle && (
        <div className={styles.notFoundWrapper}>
          <h2 className={styles.notFoundTitle}>Article is not found</h2>
          <Link to="/articles" className={styles.goBackLink}>
            Go back to articles
          </Link>
        </div>
      )}
    </>
  );
}
