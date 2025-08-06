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
                  ? article.article.replace(/\/n/g, "<br/><br/>")
                  : "",
              }}
            />
            <div className={styles.sidebarWithAction}>
              <aside className={styles.sidebar}>
                <h3>
                  Author:{" "}
                  <Link to={`/users/${article.ownerId}`}>
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
              <ButtonAddToBookmarks articleId={articleId}>
                <div className={styles.btnSave}>
                  <p>Save</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    className={styles.bookmarkIcon}
                  >
                    <path
                      d="M12.4971 4C13.7607 4.00001 14.9206 4.12091 15.8398 4.26074C17.0036 4.43777 17.916 5.2353 18.1758 6.34961C18.4894 7.69485 18.7969 9.74141 18.7441 12.4902C18.6859 15.5233 18.2432 17.7117 17.8164 19.1396C17.701 19.5256 17.4339 19.7243 17.1318 19.7754C16.816 19.8287 16.4263 19.7236 16.1094 19.4082C15.5326 18.834 14.8719 18.2138 14.2627 17.7344C13.9586 17.4951 13.6558 17.2817 13.375 17.126C13.1101 16.9791 12.7995 16.8457 12.4971 16.8457C12.1993 16.8457 11.8783 16.9769 11.5977 17.1211C11.2986 17.2747 10.9675 17.4855 10.6289 17.7246C9.95038 18.2037 9.19895 18.8244 8.53711 19.3994C8.18779 19.7029 7.77644 19.7747 7.45215 19.6865C7.13917 19.6013 6.87522 19.3609 6.79395 18.9424C6.51488 17.5044 6.25 15.3805 6.25 12.5C6.25 9.62652 6.54615 7.59969 6.84082 6.29492C7.08505 5.21356 7.9671 4.44375 9.10156 4.26855C10.0289 4.12535 11.2091 4 12.4971 4Z"
                      stroke="#F7FFFB"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </ButtonAddToBookmarks>
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
