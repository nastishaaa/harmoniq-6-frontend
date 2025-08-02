import styles from "./ArticleDetailPage.module.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectArticles } from "../../redux/articles/selectors";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

export default function ArticleDetailPage() {
  const { id: articleId } = useParams();
  const articles = useSelector(selectArticles);

  const article = articles.find(({ _id }) => _id?.$oid === articleId);

  const related = articles
    .filter(({ _id }) => _id.$oid !== articleId)
    .slice(0, 3);

  useEffect(() => {
    console.log("useEffect спрацював");
  }, []);

  if (!article) {
    return (
      <div>
        <Link to="/articles">
          {" "}
          <svg
            className={styles.goBackIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M25.5 16L10.8846 16M10.8846 16L15.2692 11.6154M10.8846 16L15.2692 20.3846M13.0769 6.5L9.42308 6.5C7.80871 6.5 6.5 7.80871 6.5 9.42308L6.5 22.5769C6.5 24.1913 7.80871 25.5 9.42308 25.5H13.0769"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>{" "}
        <SectionTitle title={"Стаття не знайдена"} />
      </div>
    );
  }

  return (
    <div className={styles.section}>
      {/* <Link to="/articles">
          {" "}
          <svg
            className={styles.goBackIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M25.5 16L10.8846 16M10.8846 16L15.2692 11.6154M10.8846 16L15.2692 20.3846M13.0769 6.5L9.42308 6.5C7.80871 6.5 6.5 7.80871 6.5 9.42308L6.5 22.5769C6.5 24.1913 7.80871 25.5 9.42308 25.5H13.0769"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link> */}
      <h2 className={styles.title}>{article.title}</h2>{" "}
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
            __html: article.article.replace(/\/n/g, "<br /><br />"),
          }}
        />
        <div className={styles.sidebarWithAction}>
          <aside className={styles.sidebar}>
            <h3>
              Author:{" "}
              <Link to={`/users/${article.ownerId.$oid}`}>
                <span className={styles.author}>{article.ownerId.$oid}</span>
              </Link>
            </h3>
            <h3>
              Publication date: <span>{article.date}</span>
            </h3>
            <h4>You can also interested</h4>
            <ul className={styles.listItem}>
              {related.map((el) => (
                <li key={el._id.$oid} className={styles.item}>
                  <div className={styles.anotherArticleContainer}>
                    <h5>{el.title}</h5>
                    <Link
                      to={`/articles/${el._id.$oid}`}
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
                    to={`authors/${el.ownerId.$oid}`}
                    className={styles.ownerTitle}
                  >
                    {el.ownerId.$oid}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <button className={styles.btnSave}>
            Save
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.9971 3.73828C13.2607 3.73829 14.4206 3.8592 15.3398 3.99902C16.5036 4.17605 17.416 4.97358 17.6758 6.08789C17.9894 7.43313 18.2969 9.47969 18.2441 12.2285C18.1859 15.2616 17.7432 17.4499 17.3164 18.8779C17.201 19.2639 16.9339 19.4626 16.6318 19.5137C16.316 19.567 15.9263 19.4619 15.6094 19.1465C15.0326 18.5723 14.3719 17.9521 13.7627 17.4727C13.4586 17.2334 13.1558 17.02 12.875 16.8643C12.6101 16.7174 12.2995 16.584 11.9971 16.584C11.6993 16.584 11.3783 16.7152 11.0977 16.8594C10.7986 17.013 10.4675 17.2238 10.1289 17.4629C9.45038 17.942 8.69895 18.5627 8.03711 19.1377C7.68779 19.4412 7.27644 19.513 6.95215 19.4248C6.63917 19.3396 6.37522 19.0992 6.29395 18.6807C6.01488 17.2427 5.75 15.1188 5.75 12.2383C5.75 9.3648 6.04615 7.33797 6.34082 6.0332C6.58505 4.95184 7.4671 4.18203 8.60156 4.00684C9.52893 3.86363 10.7091 3.73828 11.9971 3.73828Z"
                  stroke="#F7FFFB"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
