import styles from "./ArticlesList.module.css";
import { useSelector } from "react-redux";
import { selectArticles } from "../../redux/articles/selectors";
import { selectUser } from "../../redux/user/userSelectors";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import { Link } from "react-router-dom";

export default function ArticlesList() {
  const articlesItems = useSelector(selectArticles);
  const currentUser = useSelector(selectUser);
  const currentUserId = currentUser?._id;

  if (!articlesItems || articlesItems.length === 0) {
    return (
      <div className={styles.notFoundWrapper}>
        <h2 className={styles.notFoundTitle}>No articles available</h2>
        <Link to="/" className={styles.goBackLink}>
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className={styles.list}>
        {articlesItems.map((article) => (
          <li key={article._id}>
            <ArticlesItem
              article={article}
              id={article._id}
              currentUserId={currentUserId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
