import s from "./ArticlesList.module.css";
import ArticlesItem from "../ArticlesItem/ArticlesItem";

export default function ArticlesListReusable({ articles }) {
  return (
    <div>
      <ul className={s.list}>
        {articles.map((article, index) => (
          <li key={`${article._id}-${index}`}>
            <ArticlesItem article={article} id={article._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
