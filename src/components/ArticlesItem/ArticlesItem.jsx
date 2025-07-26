import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import styles from "./ArticlesItem.module.css";
import { Link } from "react-router-dom";

export default function ArticlesItem({ article, id }) {
  return (
    <article key={id} className={styles.card}>
      <img
        src={article.img}
        alt={article.title}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.content}>
        <p className={styles.author}>{article.ownerId.$oid}</p>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.desc}</p>
      </div>
      <div className={styles.bottomNavi}>
        <Link
          to={`/articles/${id}`}
          className={styles.btnLearnMore}
          aria-label={`Learn more about the article titled: ${article.title}`}
        >
          Learn more
        </Link>
        <div className={styles.bookmarkWrapper}>
          <ButtonAddToBookmarks articleId={id} />
        </div>
      </div>
    </article>
  );
}
