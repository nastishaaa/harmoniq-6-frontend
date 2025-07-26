import styles from "./ArticlesPage.module.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  selectArticles,
  selectError,
  selectLoading,
} from "../../redux/articles/selectors";
import ArticlesList from "../../components/ArticlesList/ArticlesList";

export default function ArticlesPage() {
  const articlesItems = useSelector(selectArticles);
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    console.log("Юз eфект спрацював");
  }, []);

  const articlesItemsLength = articlesItems.length;

  return (
    <div className={styles.section}>
      <SectionTitle title="Articles" />
      <div className={styles.infoPanel}>
        <p className={styles.itemsTotal}>
          {articlesItemsLength > 1
            ? ` ${articlesItemsLength} articles`
            : `${articlesItemsLength} article`}
        </p>
        <select name="filter" id="filter" className={styles.filter}>
          <option value="all">All</option>
          <option value="popular">Popular</option>
        </select>{" "}
      </div>{" "}
      {articlesItemsLength > 0 && <ArticlesList />}
      {isLoading && <p>Почекайте</p>}
      {isError && <p>Упс,помилка</p>}
      <button className={styles.btnLoadMore}>LoadMore</button>
    </div>
  );
}
