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
        <Link to="/articles">Go back</Link>
        <SectionTitle title={"Стаття не знайдена"} />
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div>
        <Link to="/articles">Go back</Link>
        <SectionTitle title={article.title} />
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
          <aside className={styles.sidebar}>
            <h3>
              Author: <Link to={`/authors/${article.ownerId.$oid}`}>
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
                    ></Link>
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
        </div>
      </div>
    </div>
  );
}
