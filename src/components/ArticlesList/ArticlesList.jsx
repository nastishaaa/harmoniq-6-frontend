// import styles from "./ArticlesList.module.css";

import { useSelector } from "react-redux";
import { selectArticles } from "../../redux/articles/selectors";
import ArticlesItem from "../ArticlesItem/ArticlesItem";

export default function ArticlesList() {
  // filterArticles---Зробити логіку фільтру
  const articlesItems = useSelector(selectArticles);

  return (
    <div>
      <ul>
        {articlesItems.map((article) => (
          <li key={article._id.$oid}>
            <ArticlesItem article={article} id={article._id.$oid} />
          </li>
        ))}
      </ul>
    </div>
  );}
